import { ErrorResponse, SucessResponse } from "../Utils/ApiResponse.js"
import Invoice from "../models/Invoice.js";
import Product from "../models/Product.js"
import puppeteer from 'puppeteer';


const fetchAllProducts = async(req,res) =>{
        try {

            const allProducts = await Product.find({})
            return res.status(200).json(SucessResponse(200,allProducts,""))
            
        } catch (error) {
            return res.status(500)
            .json(ErrorResponse(500, error.message || "interner server error"))
    
        }
}


const downloadInvoice = async(req,res) =>{

    let browser
   

    try {

        const {cartItems} = req.body
    
        if(!cartItems ){
           return res.status(400).json(ErrorResponse(400,"products are required"))
        }
   
       const invoiceData = {
           orderId: (new Date()).getTime(),
           customerName: req.user.name,
           products:cartItems,
           gstRate: 0.18,
         };

         const savedProducts = cartItems?.map(product => {
            return {
                name:product.name,
                quantity:product.quantity,
                price:product.price,
                description:product.description
            }
         })

         const savedInvoice = new Invoice({
            products:savedProducts,
            username:req.user.name,
            email:req.user.email
         })

         await savedInvoice.save()





        browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
        const page = await browser.newPage();
    
        // Calculate totals
        const subtotal = invoiceData.products.reduce((sum, product) => sum + (product.quantity * product.price), 0);
        const gstAmount = subtotal * invoiceData.gstRate;
        const grandTotal = subtotal + gstAmount;
        let currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + 3);
        let formattedDate = currentDate.toLocaleDateString();
    
        // Generate HTML content for the invoice
        const invoiceHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Invoice</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 0;
            }
            .invoice-box {
              max-width: 800px;
              margin: auto;
              padding: 30px;
              position: relative;
            }
            table {
              width: 100%;
              line-height: 1.6;
              text-align: left;
              border-collapse: collapse;
              margin: 40px;
            }
            td {
              padding: 8px;
              vertical-align: top;
            }
            .title {
              display: flex;
              justify-content: space-between;
              align-items: center;
              font-size:20px;
            }
        
            .text-logo{
              font-size:30px;
              font-weight: 600;
            }
           
            .heading {
              background: #eee;
              font-weight: bold;
            }
            .information{
                font-size:18px
            }
            .item {
              border-bottom: 1px solid #eee;
            }
            .total {
              font-weight: bold;
              border-top: 2px solid #eee;
            }
            .validity {
               margin: 50px 0px;
              left: 0;
              font-size: 16px;
            }
            .terms {
              display: flex ;
              align-items: center;
              justify-content: center;
              flex-direction: column;
              gap: 2px;
              background: black;
              color: white;
              padding: 20px 40px;
              margin-top: 20px;
              border-radius: 50px;
              font-size: 12px;
              position: relative;
              top: 360px;
            }
          </style>
        </head>
        <body>
          <div class="invoice-box">
            <div class="title">
              <div >
                <h2 style="margin: 0px;">Invoice</h2>
              <span>Sample Output should be this</span>
              </div>
              <div>
                <span class="text-logo">Levitation Infotech</span>
              </div>
            </div>
            <table>
              <tr class="information">
                <td colspan="4" >Customer Name : <span style="font-weight: 600;">${invoiceData.customerName}</span></td>
              </tr>
              <tr class="heading">
                <td>Item</td>
                <td>Qty</td>
                <td>Price</td>
                <td>Total</td>
              </tr>
              ${invoiceData.products.map(product => `
              <tr class="item">
                <td>${product.name}</td>
                <td>${product.quantity}</td>
                <td> ${product.price}</td>
                <td>INR ${(product.quantity * product.price)}</td>
              </tr>
              `).join('')}
              <tr class="total">
                <td colspan="3">Subtotal</td>
                <td>INR ${subtotal}</td>
              </tr>
              <tr class="total">
                <td colspan="3">GST (18%)</td>
                <td>INR ${gstAmount.toFixed(2)}</td>
              </tr>
              <tr class="total">
                <td colspan="3">Grand Total</td>
                <td>INR ${grandTotal.toFixed(2)}</td>
              </tr>
            </table>
            <div class="validity">
              Valid till: <span style="font-weight: 600;">${formattedDate}</span>
            </div>
            <div class="terms">
              <h3 style="margin: 0;">Terms and Conditions</h3>
                <p style="margin: 0;">we are happy to supply any furthur information you may need and trust that you call on us to fill your order.<br> which will receive our prompt and careful attention </p>
            </div>
          </div>
        </body>
        </html>
        `;
    
        // Set the content with a longer timeout
        await page.setContent(invoiceHtml, { waitUntil: 'networkidle0', timeout: 60000 });
    
        // Generate PDF
        const pdfBuffer = await page.pdf({ format: 'A4',printBackground:true });
    
        await browser.close();
    
        // Set response headers
        res.set({
          'Content-Type': 'application/pdf',
          'Content-Disposition': 'attachment; filename="invoice.pdf"',
          'Content-Length': pdfBuffer.length
        });
    
        // Send PDF
        res.send(pdfBuffer);

        

        
    } catch (error) {
        return res.status(500)
        .json(ErrorResponse(500, error.message || "interner server error"))
    }
}



export {fetchAllProducts, downloadInvoice}