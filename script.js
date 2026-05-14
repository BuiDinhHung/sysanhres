document.addEventListener("DOMContentLoaded", function () {
  const loader = document.getElementById("loader");
  const scrollBar = document.getElementById("scrollBar");
  const navbar = document.querySelector(".navbar");
  const navToggle = document.querySelector(".nav-toggle");
  const menuRows = document.getElementById("menuRows");
  const menuSearch = document.getElementById("menuSearch");
  const menuTabs = document.querySelectorAll(".menu-tab");

  window.addEventListener("load", function () {
    setTimeout(function () {
      if (loader) {
        loader.style.opacity = "0";
        loader.style.visibility = "hidden";
      }
    }, 650);
  });

  function updateScrollBar() {
    const current = document.documentElement.scrollTop || document.body.scrollTop;
    const total = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const width = total > 0 ? (current / total) * 100 : 0;
    if (scrollBar) scrollBar.style.width = width + "%";
    if (navbar) navbar.classList.toggle("scrolled", window.scrollY > 18);
  }

  updateScrollBar();
  window.addEventListener("scroll", updateScrollBar, { passive: true });

  if (navToggle && navbar) {
    navToggle.addEventListener("click", function () {
      const isOpen = navbar.classList.toggle("menu-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
      navToggle.setAttribute("aria-label", isOpen ? "Menü schließen" : "Menü öffnen");
    });

    navbar.querySelectorAll(".nav-links a").forEach(function (link) {
      link.addEventListener("click", function () {
        navbar.classList.remove("menu-open");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.setAttribute("aria-label", "Menü öffnen");
      });
    });
  }

  const revealItems = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach(function (item) { observer.observe(item); });

  document.querySelectorAll(".counter").forEach(function (item) {
    const target = Number(item.dataset.target || 0);
    let current = 0;
    const step = Math.max(target / 60, 1);
    function tick() {
      current += step;
      if (current < target) {
        item.textContent = Math.floor(current);
        requestAnimationFrame(tick);
      } else {
        item.textContent = target;
      }
    }
    tick();
  });

  const menuItems=[{cat:"sushi",code:"S1",name:"Sushi Menü 1",desc:"8 Kappa Maki, 8 Kappa Maki Gurke, 8 Avocado Maki",price:"9,90 €",tag:"Sushi",img:"https://tse1.mm.bing.net/th?q=S1+Sushi+Men%C3%BC+1+8+Kappa+Maki%2C+8+Kappa+Maki+Gurke%2C+8+Avocado+Maki+Sushi+sushi+maki+nigiri+restaurant+food+photo&w=700&h=460&c=7&rs=1&p=0&dpr=2&pid=ImgRaw"},{cat:"sushi",code:"S2",name:"Sushi Menü 2",desc:"8 Kappa Maki Gurke, 8 Avocado Maki, 8 California Maki",price:"10,90 €",tag:"Sushi",img:"https://tse2.mm.bing.net/th?q=S2+Sushi+Men%C3%BC+2+8+Kappa+Maki+Gurke%2C+8+Avocado+Maki%2C+8+California+Maki+Sushi+sushi+maki+nigiri+restaurant+food+photo&w=700&h=460&c=7&rs=1&p=0&dpr=2&pid=ImgRaw"},{cat:"sushi",code:"S3",name:"Sushi Menü 3",desc:"8 California Maki, 8 Avocado Maki",price:"9,90 €",tag:"Sushi",img:"https://tse3.mm.bing.net/th?q=S3+Sushi+Men%C3%BC+3+8+California+Maki%2C+8+Avocado+Maki+Sushi+sushi+maki+nigiri+restaurant+food+photo&w=700&h=460&c=7&rs=1&p=0&dpr=2&pid=ImgRaw"},{cat:"sushi",code:"S4",name:"Sushi Menü 4",desc:"8 Kappa Maki, 8 Avocado Maki, 8 Gurke Maki",price:"9,90 €",tag:"Sushi",img:"https://tse4.mm.bing.net/th?q=S4+Sushi+Men%C3%BC+4+8+Kappa+Maki%2C+8+Avocado+Maki%2C+8+Gurke+Maki+Sushi+sushi+maki+nigiri+restaurant+food+photo&w=700&h=460&c=7&rs=1&p=0&dpr=2&pid=ImgRaw"},{cat:"sushi",code:"S5",name:"Sushi Menü 5",desc:"2 Sake Nigiri, 8 Sake Maki, 8 Sake Inside-Out, Lachs ummantelt",price:"17,90 €",tag:"Lachs",img:"https://tse1.mm.bing.net/th?q=S5+Sushi+Men%C3%BC+5+2+Sake+Nigiri%2C+8+Sake+Maki%2C+8+Sake+Inside-Out%2C+Lachs+ummantelt+Lachs+sushi+maki+nigiri+restaurant+food+photo&w=700&h=460&c=7&rs=1&p=0&dpr=2&pid=ImgRaw"},{cat:"sushi",code:"S6",name:"Sushi Menü 6",desc:"1 Ebi Nigiri, 8 Sake Maki, 8 Gurke Maki, 8 Sake Inside-Out",price:"15,90 €",tag:"Ebi",img:"https://tse2.mm.bing.net/th?q=S6+Sushi+Men%C3%BC+6+1+Ebi+Nigiri%2C+8+Sake+Maki%2C+8+Gurke+Maki%2C+8+Sake+Inside-Out+Ebi+sushi+maki+nigiri+restaurant+food+photo&w=700&h=460&c=7&rs=1&p=0&dpr=2&pid=ImgRaw"},{cat:"sushi",code:"S7",name:"Sushi Menü 7",desc:"8 Sake Maki, 8 Sake Inside-Out, 8 California Inside-Out",price:"19,90 €",tag:"Inside-Out",img:"https://tse3.mm.bing.net/th?q=S7+Sushi+Men%C3%BC+7+8+Sake+Maki%2C+8+Sake+Inside-Out%2C+8+California+Inside-Out+Inside-Out+sushi+maki+nigiri+restaurant+food+photo&w=700&h=460&c=7&rs=1&p=0&dpr=2&pid=ImgRaw"},{cat:"sushi",code:"S9",name:"Sushi Menü 9",desc:"2 Ebi Nigiri, 2 Sake Nigiri, 8 Sake Maki, 8 Inside-Out, 8 Kappa Maki",price:"25,90 €",tag:"Mix",img:"https://tse1.mm.bing.net/th?q=S9+Sushi+Men%C3%BC+9+2+Ebi+Nigiri%2C+2+Sake+Nigiri%2C+8+Sake+Maki%2C+8+Inside-Out%2C+8+Kappa+Maki+Mix+sushi+maki+nigiri+restaurant+food+photo&w=700&h=460&c=7&rs=1&p=0&dpr=2&pid=ImgRaw"},{cat:"sushi",code:"S10",name:"Sushi Menü 10",desc:"6 Baked Sake Rolls, 8 Sake Maki, 6 Baked vegetarische Rolls",price:"27,90 €",tag:"Baked Rolls",img:"https://tse1.mm.bing.net/th?q=S10+Sushi+Men%C3%BC+10+6+Baked+Sake+Rolls%2C+8+Sake+Maki%2C+6+Baked+vegetarische+Rolls+Baked+Rolls+sushi+maki+nigiri+restaurant+food+photo&w=700&h=460&c=7&rs=1&p=0&dpr=2&pid=ImgRaw"},{cat:"sushi",code:"S11",name:"Sushi Menü 11",desc:"8 vegetarisch Inside-Out, 8 Kappa Maki, 8 Mango Maki",price:"22,90 €",tag:"Vegetarisch",img:"https://tse2.mm.bing.net/th?q=S11+Sushi+Men%C3%BC+11+8+vegetarisch+Inside-Out%2C+8+Kappa+Maki%2C+8+Mango+Maki+Vegetarisch+sushi+maki+nigiri+restaurant+food+photo&w=700&h=460&c=7&rs=1&p=0&dpr=2&pid=ImgRaw"},{cat:"vorspeisen",code:"V1",name:"Vietnamesische Frühlingsrollen",desc:"10 Stück",price:"4,90 €",tag:"Vorspeise",img:"https://tse4.mm.bing.net/th?q=V1+Vietnamesische+Fr%C3%BChlingsrollen+10+St%C3%BCck+Vorspeise+asian+appetizer+starter+restaurant+food+photo&w=700&h=460&c=7&rs=1&p=0&dpr=2&pid=ImgRaw"},{cat:"vorspeisen",code:"V2",name:"Frühlingsrollen",desc:"2 Stück",price:"3,90 €",tag:"Knusprig",img:"https://tse1.mm.bing.net/th?q=V2+Fr%C3%BChlingsrollen+2+St%C3%BCck+Knusprig+asian+appetizer+starter+restaurant+food+photo&w=700&h=460&c=7&rs=1&p=0&dpr=2&pid=ImgRaw"},{cat:"vorspeisen",code:"V3",name:"Pekingsuppe",desc:"Sauer-scharf 🌶",price:"3,90 €",tag:"Suppe",img:"https://tse2.mm.bing.net/th?q=V3+Pekingsuppe+Sauer-scharf+%F0%9F%8C%B6+Suppe+asian+appetizer+starter+restaurant+food+photo&w=700&h=460&c=7&rs=1&p=0&dpr=2&pid=ImgRaw"},{cat:"vorspeisen",code:"V4",name:"Hühnersuppe",desc:"Mit Gemüse und Glasnudeln",price:"4,90 €",tag:"Suppe",img:"https://tse3.mm.bing.net/th?q=V4+H%C3%BChnersuppe+Mit+Gem%C3%BCse+und+Glasnudeln+Suppe+asian+appetizer+starter+restaurant+food+photo&w=700&h=460&c=7&rs=1&p=0&dpr=2&pid=ImgRaw"},{cat:"vorspeisen",code:"V5",name:"Wonton Suppe",desc:"Scharf, mit Champignons und Sojasprossen 🌶",price:"4,90 €",tag:"Wonton",img:"https://tse4.mm.bing.net/th?q=V5+Wonton+Suppe+Scharf%2C+mit+Champignons+und+Sojasprossen+%F0%9F%8C%B6+Wonton+asian+appetizer+starter+restaurant+food+photo&w=700&h=460&c=7&rs=1&p=0&dpr=2&pid=ImgRaw"},{cat:"vorspeisen",code:"V6",name:"Gemüsesuppe",desc:"Leichte Suppe mit Gemüse 🌿",price:"3,90 €",tag:"Vegetarisch",img:"https://tse1.mm.bing.net/th?q=V6+Gem%C3%BCsesuppe+Leichte+Suppe+mit+Gem%C3%BCse+%F0%9F%8C%BF+Vegetarisch+asian+appetizer+starter+restaurant+food+photo&w=700&h=460&c=7&rs=1&p=0&dpr=2&pid=ImgRaw"},{cat:"hauptgerichte",code:"M1",name:"Gebratene Nudeln mit Hühnerfleisch",desc:"Gebratene Nudeln mit Hühnerfleisch",price:"6,90 €",tag:"Nudeln",img:"https://tse3.mm.bing.net/th?q=M1+Gebratene+Nudeln+mit+H%C3%BChnerfleisch+Gebratene+Nudeln+mit+H%C3%BChnerfleisch+Nudeln+asian+main+dish+restaurant+food+photo&w=700&h=460&c=7&rs=1&p=0&dpr=2&pid=ImgRaw"},{cat:"hauptgerichte",code:"M2",name:"Gebratener Eierreis mit Ebi",desc:"Gebratener Eierreis mit Ebi",price:"8,90 €",tag:"Reis",img:"https://tse4.mm.bing.net/th?q=M2+Gebratener+Eierreis+mit+Ebi+Gebratener+Eierreis+mit+Ebi+Reis+asian+main+dish+restaurant+food+photo&w=700&h=460&c=7&rs=1&p=0&dpr=2&pid=ImgRaw"},{cat:"hauptgerichte",code:"M5",name:"Gebratener Eierreis mit Ente",desc:"Gebratener Eierreis mit Ente",price:"12,90 €",tag:"Reis",img:"https://tse3.mm.bing.net/th?q=M5+Gebratener+Eierreis+mit+Ente+Gebratener+Eierreis+mit+Ente+Reis+asian+main+dish+restaurant+food+photo&w=700&h=460&c=7&rs=1&p=0&dpr=2&pid=ImgRaw"},{cat:"hauptgerichte",code:"M10",name:"Gebratener Reis mit Ente",desc:"Gebratener Reis mit Ente",price:"12,90 €",tag:"Ente",img:"https://tse3.mm.bing.net/th?q=M10+Gebratener+Reis+mit+Ente+Gebratener+Reis+mit+Ente+Ente+asian+main+dish+restaurant+food+photo&w=700&h=460&c=7&rs=1&p=0&dpr=2&pid=ImgRaw"},{cat:"hauptgerichte",code:"M11",name:"Gebratene Nudeln mit Ente",desc:"Gebratene Nudeln mit Ente",price:"12,90 €",tag:"Nudeln",img:"https://tse4.mm.bing.net/th?q=M11+Gebratene+Nudeln+mit+Ente+Gebratene+Nudeln+mit+Ente+Nudeln+asian+main+dish+restaurant+food+photo&w=700&h=460&c=7&rs=1&p=0&dpr=2&pid=ImgRaw"},{cat:"hauptgerichte",code:"M12",name:"Gebratener Reis mit Ebi",desc:"Gebratener Reis mit Ebi",price:"12,90 €",tag:"Ebi",img:"https://tse1.mm.bing.net/th?q=M12+Gebratener+Reis+mit+Ebi+Gebratener+Reis+mit+Ebi+Ebi+asian+main+dish+restaurant+food+photo&w=700&h=460&c=7&rs=1&p=0&dpr=2&pid=ImgRaw"},{cat:"hauptgerichte",code:"M3",name:"Hühnerfleisch mit Erdnusssoße",desc:"Hühnerfleisch mit Erdnusssoße",price:"12,90 €",tag:"Huhn",img:"https://tse1.mm.bing.net/th?q=M3+H%C3%BChnerfleisch+mit+Erdnussso%C3%9Fe+H%C3%BChnerfleisch+mit+Erdnussso%C3%9Fe+Huhn+asian+main+dish+restaurant+food+photo&w=700&h=460&c=7&rs=1&p=0&dpr=2&pid=ImgRaw"},{cat:"hauptgerichte",code:"M4",name:"Ente knusprig süß-sauer",desc:"Ente knusprig süß-sauer",price:"12,90 €",tag:"Ente",img:"https://tse2.mm.bing.net/th?q=M4+Ente+knusprig+s%C3%BC%C3%9F-sauer+Ente+knusprig+s%C3%BC%C3%9F-sauer+Ente+asian+main+dish+restaurant+food+photo&w=700&h=460&c=7&rs=1&p=0&dpr=2&pid=ImgRaw"},{cat:"hauptgerichte",code:"M7",name:"Gebackenes Hühnerfleisch",desc:"Gebackenes Hühnerfleisch",price:"11,90 €",tag:"Huhn",img:"https://tse1.mm.bing.net/th?q=M7+Gebackenes+H%C3%BChnerfleisch+Gebackenes+H%C3%BChnerfleisch+Huhn+asian+main+dish+restaurant+food+photo&w=700&h=460&c=7&rs=1&p=0&dpr=2&pid=ImgRaw"},{cat:"hauptgerichte",code:"M8",name:"Rindfleisch Spezialität",desc:"Rindfleisch Spezialität",price:"11,90 €",tag:"Rind",img:"https://tse2.mm.bing.net/th?q=M8+Rindfleisch+Spezialit%C3%A4t+Rindfleisch+Spezialit%C3%A4t+Rind+asian+main+dish+restaurant+food+photo&w=700&h=460&c=7&rs=1&p=0&dpr=2&pid=ImgRaw"},{cat:"hauptgerichte",code:"M9",name:"Gà xào sả ớt",desc:"Gà xào sả ớt 🌶",price:"12,90 €",tag:"Scharf",img:"https://tse3.mm.bing.net/th?q=M9+G%C3%A0+x%C3%A0o+s%E1%BA%A3+%E1%BB%9Bt+G%C3%A0+x%C3%A0o+s%E1%BA%A3+%E1%BB%9Bt+%F0%9F%8C%B6+Scharf+asian+main+dish+restaurant+food+photo&w=700&h=460&c=7&rs=1&p=0&dpr=2&pid=ImgRaw"},{cat:"hauptgerichte",code:"M16",name:"Knusprige Ente",desc:"Knusprige Ente",price:"12,90 €",tag:"Ente",img:"https://tse1.mm.bing.net/th?q=M16+Knusprige+Ente+Knusprige+Ente+Ente+asian+main+dish+restaurant+food+photo&w=700&h=460&c=7&rs=1&p=0&dpr=2&pid=ImgRaw"},{cat:"hauptgerichte",code:"M17",name:"Gebackenes Hühnerfleisch Spezial",desc:"Gebackenes Hühnerfleisch Spezial",price:"11,90 €",tag:"Huhn",img:"https://tse2.mm.bing.net/th?q=M17+Gebackenes+H%C3%BChnerfleisch+Spezial+Gebackenes+H%C3%BChnerfleisch+Spezial+Huhn+asian+main+dish+restaurant+food+photo&w=700&h=460&c=7&rs=1&p=0&dpr=2&pid=ImgRaw"},{cat:"hauptgerichte",code:"M6",name:"Tofu Gemüse",desc:"Tofu Gemüse 🌿",price:"10,90 €",tag:"Vegetarisch",img:"https://tse4.mm.bing.net/th?q=M6+Tofu+Gem%C3%BCse+Tofu+Gem%C3%BCse+%F0%9F%8C%BF+Vegetarisch+asian+main+dish+restaurant+food+photo&w=700&h=460&c=7&rs=1&p=0&dpr=2&pid=ImgRaw"},{cat:"hauptgerichte",code:"M13",name:"Gemüsepfanne",desc:"Gemüsepfanne 🌿",price:"9,90 €",tag:"Vegetarisch",img:"https://tse2.mm.bing.net/th?q=M13+Gem%C3%BCsepfanne+Gem%C3%BCsepfanne+%F0%9F%8C%BF+Vegetarisch+asian+main+dish+restaurant+food+photo&w=700&h=460&c=7&rs=1&p=0&dpr=2&pid=ImgRaw"},{cat:"hauptgerichte",code:"M14",name:"Bami Goreng",desc:"Bami Goreng",price:"10,90 €",tag:"Nudeln",img:"https://tse3.mm.bing.net/th?q=M14+Bami+Goreng+Bami+Goreng+Nudeln+asian+main+dish+restaurant+food+photo&w=700&h=460&c=7&rs=1&p=0&dpr=2&pid=ImgRaw"},{cat:"hauptgerichte",code:"M15",name:"Nasi Goreng",desc:"Nasi Goreng",price:"10,90 €",tag:"Reis",img:"https://tse4.mm.bing.net/th?q=M15+Nasi+Goreng+Nasi+Goreng+Reis+asian+main+dish+restaurant+food+photo&w=700&h=460&c=7&rs=1&p=0&dpr=2&pid=ImgRaw"},{cat:"box",code:"N1",name:"Gebackene Banane",desc:"Gebackene Banane",price:"3,50 €",tag:"Dessert",img:"https://tse4.mm.bing.net/th?q=N1+Gebackene+Banane+Gebackene+Banane+Dessert+asian+takeaway+lunch+box+food+photo&w=700&h=460&c=7&rs=1&p=0&dpr=2&pid=ImgRaw"},{cat:"box",code:"B1",name:"Gebackene Frühlingsrollen",desc:"Gebackene Frühlingsrollen 🌿",price:"7,90 €",tag:"Box",img:"https://tse4.mm.bing.net/th?q=B1+Gebackene+Fr%C3%BChlingsrollen+Gebackene+Fr%C3%BChlingsrollen+%F0%9F%8C%BF+Box+asian+takeaway+lunch+box+food+photo&w=700&h=460&c=7&rs=1&p=0&dpr=2&pid=ImgRaw"},{cat:"box",code:"B2",name:"Gà chiên giòn",desc:"Gà chiên giòn",price:"9,90 €",tag:"Box",img:"https://tse1.mm.bing.net/th?q=B2+G%C3%A0+chi%C3%AAn+gi%C3%B2n+G%C3%A0+chi%C3%AAn+gi%C3%B2n+Box+asian+takeaway+lunch+box+food+photo&w=700&h=460&c=7&rs=1&p=0&dpr=2&pid=ImgRaw"},{cat:"box",code:"B3",name:"Gà chiên giòn Erdnuss",desc:"Gà chiên giòn Erdnuss",price:"6,90 €",tag:"Box",img:"https://tse2.mm.bing.net/th?q=B3+G%C3%A0+chi%C3%AAn+gi%C3%B2n+Erdnuss+G%C3%A0+chi%C3%AAn+gi%C3%B2n+Erdnuss+Box+asian+takeaway+lunch+box+food+photo&w=700&h=460&c=7&rs=1&p=0&dpr=2&pid=ImgRaw"},{cat:"box",code:"B4",name:"Gebratene Nudeln Box",desc:"Gebratene Nudeln Box",price:"8,90 €",tag:"Box",img:"https://tse3.mm.bing.net/th?q=B4+Gebratene+Nudeln+Box+Gebratene+Nudeln+Box+Box+asian+takeaway+lunch+box+food+photo&w=700&h=460&c=7&rs=1&p=0&dpr=2&pid=ImgRaw"},{cat:"box",code:"B5",name:"Gebratener Reis Box",desc:"Gebratener Reis Box",price:"6,90 €",tag:"Box",img:"https://tse4.mm.bing.net/th?q=B5+Gebratener+Reis+Box+Gebratener+Reis+Box+Box+asian+takeaway+lunch+box+food+photo&w=700&h=460&c=7&rs=1&p=0&dpr=2&pid=ImgRaw"},{cat:"box",code:"B6",name:"Gebratene Nudeln Erdnuss",desc:"Gebratene Nudeln Erdnuss",price:"8,90 €",tag:"Box",img:"https://tse1.mm.bing.net/th?q=B6+Gebratene+Nudeln+Erdnuss+Gebratene+Nudeln+Erdnuss+Box+asian+takeaway+lunch+box+food+photo&w=700&h=460&c=7&rs=1&p=0&dpr=2&pid=ImgRaw"},{cat:"box",code:"B7",name:"Gebratene Nudeln Hühnerfleisch",desc:"Gebratene Nudeln Hühnerfleisch",price:"11,90 €",tag:"Box",img:"https://tse2.mm.bing.net/th?q=B7+Gebratene+Nudeln+H%C3%BChnerfleisch+Gebratene+Nudeln+H%C3%BChnerfleisch+Box+asian+takeaway+lunch+box+food+photo&w=700&h=460&c=7&rs=1&p=0&dpr=2&pid=ImgRaw"},{cat:"box",code:"B8",name:"Gebratene Nudeln Hühnerbrustfilet",desc:"Gebratene Nudeln Hühnerbrustfilet",price:"10,90 €",tag:"Box",img:"https://tse3.mm.bing.net/th?q=B8+Gebratene+Nudeln+H%C3%BChnerbrustfilet+Gebratene+Nudeln+H%C3%BChnerbrustfilet+Box+asian+takeaway+lunch+box+food+photo&w=700&h=460&c=7&rs=1&p=0&dpr=2&pid=ImgRaw"},{cat:"extras",code:"E1",name:"Süß-saure Sauce",desc:"Süß-saure Sauce",price:"2,00 €",tag:"Sauce",img:"https://tse3.mm.bing.net/th?q=E1+S%C3%BC%C3%9F-saure+Sauce+S%C3%BC%C3%9F-saure+Sauce+Sauce+asian+sauce+dessert+side+dish+food+photo&w=700&h=460&c=7&rs=1&p=0&dpr=2&pid=ImgRaw"},{cat:"extras",code:"E2",name:"Erdnuss Sauce",desc:"Erdnuss Sauce",price:"2,00 €",tag:"Sauce",img:"https://tse4.mm.bing.net/th?q=E2+Erdnuss+Sauce+Erdnuss+Sauce+Sauce+asian+sauce+dessert+side+dish+food+photo&w=700&h=460&c=7&rs=1&p=0&dpr=2&pid=ImgRaw"},{cat:"extras",code:"E7",name:"Wasabi Sauce",desc:"Wasabi Sauce",price:"0,50 €",tag:"Sauce",img:"https://tse1.mm.bing.net/th?q=E7+Wasabi+Sauce+Wasabi+Sauce+Sauce+asian+sauce+dessert+side+dish+food+photo&w=700&h=460&c=7&rs=1&p=0&dpr=2&pid=ImgRaw"},{cat:"extras",code:"E8",name:"Sriracha Sauce",desc:"Sriracha Sauce 🌶",price:"0,50 €",tag:"Sauce",img:"https://tse2.mm.bing.net/th?q=E8+Sriracha+Sauce+Sriracha+Sauce+%F0%9F%8C%B6+Sauce+asian+sauce+dessert+side+dish+food+photo&w=700&h=460&c=7&rs=1&p=0&dpr=2&pid=ImgRaw"},{cat:"extras",code:"E3",name:"Gebackene Banane",desc:"Gebackene Banane",price:"2,50 €",tag:"Dessert",img:"https://tse1.mm.bing.net/th?q=E3+Gebackene+Banane+Gebackene+Banane+Dessert+asian+sauce+dessert+side+dish+food+photo&w=700&h=460&c=7&rs=1&p=0&dpr=2&pid=ImgRaw"},{cat:"extras",code:"E4",name:"Gebackene Ananas",desc:"Gebackene Ananas",price:"2,50 €",tag:"Dessert",img:"https://tse2.mm.bing.net/th?q=E4+Gebackene+Ananas+Gebackene+Ananas+Dessert+asian+sauce+dessert+side+dish+food+photo&w=700&h=460&c=7&rs=1&p=0&dpr=2&pid=ImgRaw"},{cat:"extras",code:"E5",name:"Gebackene Lychee",desc:"Gebackene Lychee",price:"2,50 €",tag:"Dessert",img:"https://tse3.mm.bing.net/th?q=E5+Gebackene+Lychee+Gebackene+Lychee+Dessert+asian+sauce+dessert+side+dish+food+photo&w=700&h=460&c=7&rs=1&p=0&dpr=2&pid=ImgRaw"},{cat:"extras",code:"E6",name:"Gebackenes Eis",desc:"Gebackenes Eis",price:"2,50 €",tag:"Dessert",img:"https://tse4.mm.bing.net/th?q=E6+Gebackenes+Eis+Gebackenes+Eis+Dessert+asian+sauce+dessert+side+dish+food+photo&w=700&h=460&c=7&rs=1&p=0&dpr=2&pid=ImgRaw"},{cat:"extras",code:"E9",name:"Portion Ingwer",desc:"Portion Ingwer",price:"1,00 €",tag:"Extra",img:"https://tse3.mm.bing.net/th?q=E9+Portion+Ingwer+Portion+Ingwer+Extra+asian+sauce+dessert+side+dish+food+photo&w=700&h=460&c=7&rs=1&p=0&dpr=2&pid=ImgRaw"},{cat:"extras",code:"E10",name:"Portion Wasabi",desc:"Portion Wasabi",price:"1,00 €",tag:"Extra",img:"https://tse3.mm.bing.net/th?q=E10+Portion+Wasabi+Portion+Wasabi+Extra+asian+sauce+dessert+side+dish+food+photo&w=700&h=460&c=7&rs=1&p=0&dpr=2&pid=ImgRaw"},{cat:"getraenke",code:"G1",name:"Cola 0,5 l",desc:"Cola 0,5 l",price:"2,90 €",tag:"Getränk",img:"https://tse1.mm.bing.net/th?q=G1+Cola+0%2C5+l+Cola+0%2C5+l+Getr%C3%A4nk+drink+beverage+product+photo&w=700&h=460&c=7&rs=1&p=0&dpr=2&pid=ImgRaw"},{cat:"getraenke",code:"G2",name:"Cola Light 0,5 l",desc:"Cola Light 0,5 l",price:"2,90 €",tag:"Getränk",img:"https://tse2.mm.bing.net/th?q=G2+Cola+Light+0%2C5+l+Cola+Light+0%2C5+l+Getr%C3%A4nk+drink+beverage+product+photo&w=700&h=460&c=7&rs=1&p=0&dpr=2&pid=ImgRaw"},{cat:"getraenke",code:"G3",name:"Fanta 0,5 l",desc:"Fanta 0,5 l",price:"2,90 €",tag:"Getränk",img:"https://tse3.mm.bing.net/th?q=G3+Fanta+0%2C5+l+Fanta+0%2C5+l+Getr%C3%A4nk+drink+beverage+product+photo&w=700&h=460&c=7&rs=1&p=0&dpr=2&pid=ImgRaw"},{cat:"getraenke",code:"G4",name:"Sprite 0,5 l",desc:"Sprite 0,5 l",price:"2,90 €",tag:"Getränk",img:"https://tse4.mm.bing.net/th?q=G4+Sprite+0%2C5+l+Sprite+0%2C5+l+Getr%C3%A4nk+drink+beverage+product+photo&w=700&h=460&c=7&rs=1&p=0&dpr=2&pid=ImgRaw"},{cat:"getraenke",code:"G5",name:"Cola / Cola Light / Fanta / Sprite 0,33 l",desc:"Cola / Cola Light / Fanta / Sprite 0,33 l",price:"3,30 €",tag:"Getränk",img:"https://tse1.mm.bing.net/th?q=G5+Cola+%2F+Cola+Light+%2F+Fanta+%2F+Sprite+0%2C33+l+Cola+%2F+Cola+Light+%2F+Fanta+%2F+Sprite+0%2C33+l+Getr%C3%A4nk+drink+beverage+product+photo&w=700&h=460&c=7&rs=1&p=0&dpr=2&pid=ImgRaw"},{cat:"getraenke",code:"G6",name:"Red Bull",desc:"Red Bull Dose",price:"2,80 €",tag:"Getränk",img:"https://tse2.mm.bing.net/th?q=G6+Red+Bull+Red+Bull+Dose+Getr%C3%A4nk+drink+beverage+product+photo&w=700&h=460&c=7&rs=1&p=0&dpr=2&pid=ImgRaw"},{cat:"getraenke",code:"G7",name:"Mangosaft",desc:"Mangosaft",price:"2,90 €",tag:"Saft",img:"https://tse3.mm.bing.net/th?q=G7+Mangosaft+Mangosaft+Saft+drink+beverage+product+photo&w=700&h=460&c=7&rs=1&p=0&dpr=2&pid=ImgRaw"},{cat:"getraenke",code:"G8",name:"Lycheesaft",desc:"Lycheesaft",price:"2,90 €",tag:"Saft",img:"https://tse4.mm.bing.net/th?q=G8+Lycheesaft+Lycheesaft+Saft+drink+beverage+product+photo&w=700&h=460&c=7&rs=1&p=0&dpr=2&pid=ImgRaw"}];
  const labels = { sushi: "Sushi Menüs", vorspeisen: "Vorspeisen", hauptgerichte: "Hauptgerichte", box: "Box To Go", extras: "Extras & Saucen", getraenke: "Getränke" };
  let currentFilter = "all";

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, function (char) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#39;" }[char];
    });
  }

  function fallbackImage(name) {
    return "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='700' height='460' viewBox='0 0 700 460'%3E%3Crect width='700' height='460' fill='%23f8f3ea'/%3E%3Ccircle cx='350' cy='170' r='76' fill='%23d8b47a' opacity='0.35'/%3E%3Ctext x='350' y='285' font-family='Georgia' font-size='34' text-anchor='middle' fill='%239a6a32'%3E" + encodeURIComponent(name) + "%3C/text%3E%3C/svg%3E";
  }
  window.fallbackImage = fallbackImage;

  function card(item, index) {
    const safeName = escapeHtml(item.name);
    const safeDesc = escapeHtml(item.desc);
    const safeCode = escapeHtml(item.code);
    const safeTag = escapeHtml(item.tag);
    const safePrice = escapeHtml(item.price);
    const safeImg = escapeHtml(item.img);
    const fallbackName = item.name.replace(/'/g, "");
    return `<article class="food-card" data-cat="${escapeHtml(item.cat)}" style="animation-delay:${Math.min(0.035 * index, 0.45)}s"><div class="food-img-wrap"><img class="food-img" src="${safeImg}" alt="${safeName}" loading="lazy" onerror="this.onerror=null;this.src=fallbackImage('${escapeHtml(fallbackName)}')"></div><div class="food-price">${safePrice}</div><div class="food-content"><div class="food-code">${safeCode} · ${safeTag}</div><h3 class="food-name">${safeName}</h3><p class="food-desc">${safeDesc}</p><button class="food-badge" type="button">Ansehen</button></div></article>`;
  }

  function render() {
    if (!menuRows) return;
    const query = (menuSearch ? menuSearch.value : "").toLowerCase().trim();
    const filtered = menuItems.filter(function (item) {
      const haystack = (item.code + " " + item.name + " " + item.desc + " " + item.tag).toLowerCase();
      return (currentFilter === "all" || item.cat === currentFilter) && haystack.includes(query);
    });
    const cats = currentFilter === "all" ? Object.keys(labels) : [currentFilter];
    menuRows.innerHTML = cats.map(function (cat) {
      const rowItems = filtered.filter(function (item) { return item.cat === cat; });
      if (!rowItems.length) return "";
      return `<div class="menu-row-block" data-category="${cat}"><div class="row-title"><h3>${labels[cat]}</h3><span>${rowItems.length} Gerichte</span></div><div class="wave-stage"><div class="wave-menu-track">${rowItems.map(card).join("")}</div></div></div>`;
    }).join("") || '<div class="section-head"><p>Keine Gerichte gefunden.</p></div>';
    setupMenu();
  }

  function setupMenu() {
    document.querySelectorAll(".food-img,.food-badge").forEach(function (item) {
      item.addEventListener("click", function () {
        const cardElement = item.closest(".food-card");
        const image = cardElement ? cardElement.querySelector(".food-img") : null;
        if (image) openLightbox(image.src, image.alt);
      });
    });
  }

  menuTabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      menuTabs.forEach(function (item) { item.classList.remove("active"); });
      tab.classList.add("active");
      currentFilter = tab.dataset.filter || "all";
      if (menuSearch) menuSearch.value = "";
      render();
    });
  });
  if (menuSearch) menuSearch.addEventListener("input", render);

  const lightbox = document.createElement("div");
  lightbox.className = "image-lightbox";
  lightbox.innerHTML = '<div class="lightbox-card"><img id="lightboxImg" src="" alt=""><div class="lightbox-caption"><strong id="lightboxTitle"></strong><button type="button" id="lightboxClose">Schließen</button></div></div>';
  document.body.appendChild(lightbox);

  function openLightbox(src, title) {
    const image = document.getElementById("lightboxImg");
    const caption = document.getElementById("lightboxTitle");
    if (image) image.src = src;
    if (caption) caption.textContent = title;
    lightbox.classList.add("active");
  }

  const closeButton = document.getElementById("lightboxClose");
  if (closeButton) closeButton.addEventListener("click", function () { lightbox.classList.remove("active"); });
  lightbox.addEventListener("click", function (event) {
    if (event.target === lightbox) lightbox.classList.remove("active");
  });

  render();
});
