const express = require("express");
const expressLayouts = require("express-ejs-layouts");

const app = express();
const path = require("path");

app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.use(expressLayouts);

const PORT = 3000;

app.get("/", (req, res) => {
  res.render("home", {
    page: "home",
    title: "Ana Sayfa",
    name: "Elif",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    page: "about",
    title: "Hakkımda",
  });
});

app.listen(PORT, () => {
  console.log(`Sunucu çalışıyor: http://localhost:${PORT}`);
});

/* 
views klasörü: kullanıcıya gösterilecek HMTL sayfalarını tutmak.
Express şunu bilir: "ben render edeceğim sayfaları views/ klasöründe ararım."

home.ejs: normal HTML dosyasıdır
ama içinde JavaScript çalıştırabilir
HTML+JS = EJS

ÖRNEK: 
<h1>Merhaba <%=name %></h1>
bu satır: HTML gibi görünür
ama name değişkenini server'dan alır

Express kendiliğinden EJS kullanmaz
biz açıkça söyledik:
app.set("view engine", "ejs");
bu satır şunu yapar: "render edeceğim dosyalar .ejs uzantılı olacak."
ve artık şu mümkün olur: res.render("home");

Express otomatik olarak şuna bakar: views/home.ejs

res.send("Merhaba") --> düz yazı, demo için, gerçek web app için yetersiz.
res.render("home") --> HTML üretir, view engine kullanır, gerçek web uygulaması budur.

app.get("/", (req,res) => {
  res.render("home", {
    name: "Elif",
    title: "Ana Sayfa"
  });
});

--> burada name ve title home.ejs'ye gönderilir.

home.ejs'de:
<h1>Merhaba <%= name %> 👋</h1>
<p><%= title %></p>

--> bu şu anlama gelir:
HTML server'da oluşturuluyor
ve içine dinamik veri basılıyor

bu: Server-side rendering

tarayıcı asla şunu bilmez: EJS, Node.js, Express
tarayıcı sadece şunu görür: <h1>Merhaba Elif</h1>
yani: EJS tarayıcıya gitmez, server'da çalışır
EJS:backend tarafı
Tarayıcı=frontend sonucu
EJS/Node/Express --> kullanıcıdan gizli

yani kullanıcı şunu asla görmez:
<%= name %>
sadece şunu görür:
<h1>Merhaba Elif 👋</h1>

Template engine'ler(EJS gibi) tarayıcıya gitmez, server'da HTML üretir

Tarayıcı
  ↓ GET /
Express route
  ↓
res.render("home", data)
  ↓
EJS HTML üretir
  ↓
HTML tarayıcıya gider

*/
