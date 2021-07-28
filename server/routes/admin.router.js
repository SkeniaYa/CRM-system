const config = require('./config/config.json');
let http = require('request')
const { Router } = require("express");
const router = Router();
const User = require("../db/models/userModel");
const Clients = require("../db/models/clientModel");
const Orders = require("../db/models/orderModel");
var nodemailer = require("nodemailer");

router.post("/workers/added/new", async (req, res) => {
  let admin = await User.find({ isAdmin: true });
  const { email } = req?.body;
  try {
    if (email) {
      const newUser = await User.create(req.body);
      var mailData = {
        from: "2same1as2@gmail.com",
        to: email,
        subject: "test",
        text: "test email",
      };
      const nodemailer = require("nodemailer");
      async function main() {
        console.log("Credentials obtained, sending message...");
        // Message object
        var transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "2same1as2@gmail.com", //admin[0].email,
            pass: "Zbc320098",
          },
        });
        let message = {
          // Comma separated list of recipients
          to: email,

          // Subject of the message
          subject: "CRM",

          // plaintext body
          text: "Wellcome to CRM!",

          html:`
          <!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
          <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
          <head>
          <!--[if gte mso 9]>
          <xml>
            <o:OfficeDocumentSettings>
              <o:AllowPNG/>
              <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
          </xml>
          <![endif]-->
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta name="x-apple-disable-message-reformatting">
            <!--[if !mso]><!--><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]-->
            <title></title>
            
              <style type="text/css">
                table, td { color: #000000; } a { color: #68c8c7; text-decoration: none; } @media (max-width: 480px) { #u_content_text_14 .v-text-align { text-align: center !important; } #u_content_text_13 .v-text-align { text-align: center !important; } }
          @media only screen and (min-width: 670px) {
            .u-row {
              width: 650px !important;
            }
            .u-row .u-col {
              vertical-align: top;
            }
          
            .u-row .u-col-46p77 {
              width: 304.00500000000005px !important;
            }
          
            .u-row .u-col-53p23 {
              width: 345.995px !important;
            }
          
            .u-row .u-col-100 {
              width: 650px !important;
            }
          
          }
          
          @media (max-width: 670px) {
            .u-row-container {
              max-width: 100% !important;
              padding-left: 0px !important;
              padding-right: 0px !important;
            }
            .u-row .u-col {
              min-width: 320px !important;
              max-width: 100% !important;
              display: block !important;
            }
            .u-row {
              width: calc(100% - 40px) !important;
            }
            .u-col {
              width: 100% !important;
            }
            .u-col > div {
              margin: 0 auto;
            }
          }
          body {
            margin: 0;
            padding: 0;
          }
          
          table,
          tr,
          td {
            vertical-align: top;
            border-collapse: collapse;
          }
          
          p {
            margin: 0;
          }
          
          .ie-container table,
          .mso-container table {
            table-layout: fixed;
          }
          
          * {
            line-height: inherit;
          }
          
          a[x-apple-data-detectors='true'] {
            color: inherit !important;
            text-decoration: none !important;
          }
          
          @media (max-width: 480px) {
            .hide-mobile {
              display: none !important;
              max-height: 0px;
              overflow: hidden;
            }
          
          }
              </style>
            
            
          
          <!--[if !mso]><!--><link href="https://fonts.googleapis.com/css?family=Open+Sans:400,700&display=swap" rel="stylesheet" type="text/css"><!--<![endif]-->
          
          </head>
          
          <body class="clean-body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #f9f9f9;color: #000000">
            <!--[if IE]><div class="ie-container"><![endif]-->
            <!--[if mso]><div class="mso-container"><![endif]-->
            <table style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #f9f9f9;width:100%" cellpadding="0" cellspacing="0">
            <tbody>
            <tr style="vertical-align: top">
              <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
              <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #f9f9f9;"><![endif]-->
              
          
          <div class="u-row-container hide-mobile" style="padding: 0px;background-color: transparent">
            <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 650px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #131313;">
              <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
                <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:650px;"><tr style="background-color: #131313;"><![endif]-->
                
          <!--[if (mso)|(IE)]><td align="center" width="650" style="width: 650px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
          <div class="u-col u-col-100" style="max-width: 320px;min-width: 650px;display: table-cell;vertical-align: top;">
            <div style="width: 100% !important;">
            <!--[if (!mso)&(!IE)]><!--><div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
            
          <table style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
            <tbody>
              <tr>
                <td style="overflow-wrap:break-word;word-break:break-word;padding:15px;font-family:'Open Sans',sans-serif;" align="left">
                  
            <table height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="0%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 1px solid #000000;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
              <tbody>
                <tr style="vertical-align: top">
                  <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                    <span>&#160;</span>
                  </td>
                </tr>
              </tbody>
            </table>
          
                </td>
              </tr>
            </tbody>
          </table>
          
          <table id="u_content_text_14" style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
            <tbody>
              <tr>
                <td style="overflow-wrap:break-word;word-break:break-word;padding:10px 17px;font-family:'Open Sans',sans-serif;" align="left">
                  
            <div class="v-text-align" style="color: #ffffff; line-height: 200%; text-align: left; word-wrap: break-word;">
              <p style="font-size: 14px; line-height: 200%; text-align: center;"><span style="font-size: 18px; line-height: 36px;">Добрый день! </span></p>
          <p style="font-size: 14px; line-height: 200%; text-align: center;"><span style="font-size: 18px; line-height: 36px;">Ваша почта была добавлена для авторизации</span></p>
            </div>
          
                </td>
              </tr>
            </tbody>
          </table>
          
          <table style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
            <tbody>
              <tr>
                <td style="overflow-wrap:break-word;word-break:break-word;padding:15px;font-family:'Open Sans',sans-serif;" align="left">
                  
            <table height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="0%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 1px solid #000000;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
              <tbody>
                <tr style="vertical-align: top">
                  <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                    <span>&#160;</span>
                  </td>
                </tr>
              </tbody>
            </table>
          
                </td>
              </tr>
            </tbody>
          </table>
          
            <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
            </div>
          </div>
          <!--[if (mso)|(IE)]></td><![endif]-->
                <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
              </div>
            </div>
          </div>
          
          
          
          <div class="u-row-container" style="padding: 0px;background-color: transparent">
            <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 650px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
              <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
                <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:650px;"><tr style="background-color: #ffffff;"><![endif]-->
                
          <!--[if (mso)|(IE)]><td align="center" width="650" style="width: 650px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
          <div class="u-col u-col-100" style="max-width: 320px;min-width: 650px;display: table-cell;vertical-align: top;">
            <div style="width: 100% !important;">
            <!--[if (!mso)&(!IE)]><!--><div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
            
          <table style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
            <tbody>
              <tr>
                <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Open Sans',sans-serif;" align="left">
                  
          <table width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td class="v-text-align" style="padding-right: 0px;padding-left: 0px;" align="center">
                
                <img align="center" border="0" src="https://reshetilov.top/files/media/blog/speed-google.png" alt="Image" title="Image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 100%;max-width: 630px;" width="630"/>
                
              </td>
            </tr>
          </table>
          
                </td>
              </tr>
            </tbody>
          </table>
          
          <table style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
            <tbody>
              <tr>
                <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Open Sans',sans-serif;" align="left">
                  
            <table height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 1px solid #BBBBBB;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
              <tbody>
                <tr style="vertical-align: top">
                  <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                    <span>&#160;</span>
                  </td>
                </tr>
              </tbody>
            </table>
          
                </td>
              </tr>
            </tbody>
          </table>
          
            <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
            </div>
          </div>
          <!--[if (mso)|(IE)]></td><![endif]-->
                <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
              </div>
            </div>
          </div>
          
          
          
          <div class="u-row-container" style="padding: 0px;background-color: transparent">
            <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 650px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
              <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
                <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:650px;"><tr style="background-color: #ffffff;"><![endif]-->
                
          <!--[if (mso)|(IE)]><td align="center" width="304" style="width: 304px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
          <div class="u-col u-col-46p77" style="max-width: 320px;min-width: 304px;display: table-cell;vertical-align: top;">
            <div style="width: 100% !important;">
            <!--[if (!mso)&(!IE)]><!--><div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
            
          <table style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
            <tbody>
              <tr>
                <td style="overflow-wrap:break-word;word-break:break-word;padding:0px;font-family:'Open Sans',sans-serif;" align="left">
                  
          <table width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td class="v-text-align" style="padding-right: 0px;padding-left: 0px;" align="right">
                
                <img align="right" border="0" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDlvRQVEe1AEvAUI0xD9JVnsDLAAnulRBxYQ&usqp=CAU" alt="Image" title="Image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 33%;max-width: 100.32px;" width="100.32"/>
                
              </td>
            </tr>
          </table>
          
                </td>
              </tr>
            </tbody>
          </table>
          
            <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
            </div>
          </div>
          <!--[if (mso)|(IE)]></td><![endif]-->
          <!--[if (mso)|(IE)]><td align="center" width="346" style="width: 346px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
          <div class="u-col u-col-53p23" style="max-width: 320px;min-width: 346px;display: table-cell;vertical-align: top;">
            <div style="width: 100% !important;">
            <!--[if (!mso)&(!IE)]><!--><div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
            
          <table style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
            <tbody>
              <tr>
                <td style="overflow-wrap:break-word;word-break:break-word;padding:30px 10px 1px;font-family:'Open Sans',sans-serif;" align="left">
                  
          <div class="v-text-align" align="left">
            <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-spacing: 0; border-collapse: collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;font-family:'Open Sans',sans-serif;"><tr><td class="v-text-align" style="font-family:'Open Sans',sans-serif;" align="left"><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="http://localhost:3000/" style="height:50px; v-text-anchor:middle; width:262px;" arcsize="8%" stroke="f" fillcolor="#8cd1f0"><w:anchorlock/><center style="color:#FFFFFF;font-family:'Open Sans',sans-serif;"><![endif]-->
              <a href="http://localhost:3000/" target="_self" style="box-sizing: border-box;display: inline-block;font-family:'Open Sans',sans-serif;text-decoration: none;-webkit-text-size-adjust: none;text-align: center;color: #FFFFFF; background-color: #8cd1f0; border-radius: 4px; -webkit-border-radius: 4px; -moz-border-radius: 4px; width:auto; max-width:100%; overflow-wrap: break-word; word-break: break-word; word-wrap:break-word; mso-border-alt: none;">
                <span style="display:block;padding:12px 35px;line-height:120%;"><span style="font-size: 22px; line-height: 26.4px;"><strong><span style="line-height: 26.4px; font-size: 22px;">Перейти на сайт</span></strong></span></span>
              </a>
            <!--[if mso]></center></v:roundrect></td></tr></table><![endif]-->
          </div>
          
                </td>
              </tr>
            </tbody>
          </table>
          
          <table id="u_content_text_13" style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
            <tbody>
              <tr>
                <td style="overflow-wrap:break-word;word-break:break-word;padding:17px 17px 8px;font-family:'Open Sans',sans-serif;" align="left">
                  
            <div class="v-text-align" style="color: #68c8c7; line-height: 140%; text-align: left; word-wrap: break-word;">
              
            </div>
          
                </td>
              </tr>
            </tbody>
          </table>
          
            <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
            </div>
          </div>
          <!--[if (mso)|(IE)]></td><![endif]-->
                <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
              </div>
            </div>
          </div>
          
          
          
          <div class="u-row-container" style="padding: 0px;background-color: transparent">
            <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 650px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
              <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
                <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:650px;"><tr style="background-color: #ffffff;"><![endif]-->
                
          <!--[if (mso)|(IE)]><td align="center" width="650" style="width: 650px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
          <div class="u-col u-col-100" style="max-width: 320px;min-width: 650px;display: table-cell;vertical-align: top;">
            <div style="width: 100% !important;">
            <!--[if (!mso)&(!IE)]><!--><div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
            
          <table style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
            <tbody>
              <tr>
                <td style="overflow-wrap:break-word;word-break:break-word;padding:18px;font-family:'Open Sans',sans-serif;" align="left">
                  
            <table height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 1px solid #ffffff;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
              <tbody>
                <tr style="vertical-align: top">
                  <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                    <span>&#160;</span>
                  </td>
                </tr>
              </tbody>
            </table>
          
                </td>
              </tr>
            </tbody>
          </table>
          
            <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
            </div>
          </div>
          <!--[if (mso)|(IE)]></td><![endif]-->
                <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
              </div>
            </div>
          </div>
          
          
          
          <div class="u-row-container" style="padding: 0px;background-color: transparent">
            <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 650px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #000000;">
              <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
                <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:650px;"><tr style="background-color: #000000;"><![endif]-->
                
          <!--[if (mso)|(IE)]><td align="center" width="650" style="width: 650px;padding: 6px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
          <div class="u-col u-col-100" style="max-width: 320px;min-width: 650px;display: table-cell;vertical-align: top;">
            <div style="width: 100% !important;">
            <!--[if (!mso)&(!IE)]><!--><div style="padding: 6px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
            
          <table style="font-family:'Open Sans',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
            <tbody>
              <tr>
                <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Open Sans',sans-serif;" align="left">
                  
            <div class="v-text-align" style="color: #828694; line-height: 140%; text-align: center; word-wrap: break-word;">
              <p style="font-size: 14px; line-height: 140%;">Copyright &copy; Sapengine, Inc, All rights reserved. </p>
            </div>
          
                </td>
              </tr>
            </tbody>
          </table>
          
            <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
            </div>
          </div>
          <!--[if (mso)|(IE)]></td><![endif]-->
                <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
              </div>
            </div>
          </div>
          
          
              <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
              </td>
            </tr>
            </tbody>
            </table>
            <!--[if mso]></div><![endif]-->
            <!--[if IE]></div><![endif]-->
          </body>
          
          </html>
    
  `
};

 let info = await transporter.sendMail(message);
 console.log("Message sent successfully!")
 transporter.close();
}

let fields = ["<b>Новый пользователь</b>: " +  newUser?.email +" Привет!"];
      let msg = "";
      fields.forEach((field) => {
        msg += field + "\n";
      });
      msg = encodeURI(msg);
      http.post(
        `https://api.telegram.org/bot${config.telegram.token}/sendMessage?chat_id=${config.telegram.chat}&parse_mode=html&text=${msg}`,
        function (error) {
          console.log("error:", error);
          console.log("statusCode:");
        }
        );
        
        //  return res.json(newUser);
        main().catch((err) => {
          console.error(err.message);
          process.exit(1);
        });
        return res.status(200).json(newUser);
    }

//  return res.json(newUser);
// main().catch((err) => {
// console.error(err.message);
// process.exit(1);
//  });
// }
} catch (err) {
  return res.sendStatus(403);
}
});
router.get("/workers", async (req, res) => {
  const workers = await User.find();
  return res.json( workers);
});


router.post("/workers/add/:id", async (req, res) => {
  const { id: _id } = req.params;
  
  try {
    const user = await User.findById(_id);
    const nowAdmin = await User.findByIdAndUpdate(
      _id,
      {
        isAdmin: !user.isAdmin,
      },
      { new: true }
      );
      
    res.json(nowAdmin);
  } catch (err) {
    return res.sendStatus(403);
  }
});

router.post("/clients/new/:id", async (req, res) => {
  const { id: _id } = req.params;
  try {
    const client = await Clients.findById(_id);
    const thisClient = await Clients.findByIdAndUpdate(
      _id,
      {
        isDelete: !client.isDelete,
      },
      { new: true }
    );
    res.json(thisClient);
  } catch (err) {
    return res.sendStatus(403);
  }
});

router.get("/clients", async (req, res) => {
  const allDeletedClients = await Clients.find({ isDelete: true });
  console.log("allDeletedClients===>>>>", allDeletedClients);
  return res.json(allDeletedClients);
});
router.delete("/clients/:id", async (req, res) => {
  await Clients.findByIdAndDelete(req.params.id);
  res.sendStatus(200);
});

router.get("/orders", async (req, res) => {
  const allDeletedOrders = await Orders.find({ isDelete: true }).populate("client");
  return res.json(allDeletedOrders);
});

router.post("/orders/new/:id", async (req, res) => {
  const { id: _id } = req.params;
  console.log(req.params);
  try {
    const client = await Orders.findById(_id);
    const thisClient = await Orders.findByIdAndUpdate(
      _id,
      {
        isDelete: !client.isDelete,
      },
      { new: true }
    );
    console.log(thisClient);
    res.json(thisClient);
  } catch (err) {
    return res.sendStatus(403);
  }
});
router.delete("/orders/:id", async (req, res) => {
  await Orders.findByIdAndDelete(req.params.id);
  res.sendStatus(200);
});
module.exports = router;
