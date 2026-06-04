const http=require("http"),fs=require("fs"),p=require("path");
const m={".html":"text/html",".mp4":"video/mp4",".js":"application/javascript"};
http.createServer((q,r)=>{let f=q.url==="/"?"/index.html":q.url;f=p.join(__dirname,f);
const e=p.extname(f);fs.readFile(f,(err,d)=>{if(err){r.writeHead(404);r.end();return;}
r.writeHead(200,{"Content-Type":m[e]||"application/octet-stream"});r.end(d)})}).listen(8877,()=>console.log("8877"));
