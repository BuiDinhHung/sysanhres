document.addEventListener("DOMContentLoaded", function () {
  const loader = document.getElementById("loader");
  const scrollBar = document.getElementById("scrollBar");
  const navbar = document.querySelector(".navbar");
  const navToggle = document.querySelector(".nav-toggle");
  const menuRows = document.getElementById("menuRows");
  const menuSearch = document.getElementById("menuSearch");
  let menuTabs = document.querySelectorAll(".menu-tab");
  let currentFilter = "all";
  let autoSlideTimer;

  function hideLoader() {
    if (loader) loader.classList.add("is-hidden");
  }

  window.addEventListener("load", function () {
    setTimeout(hideLoader, 650);
  });
  setTimeout(hideLoader, 1800);

  function updateScrollBar() {
    const current = document.documentElement.scrollTop || document.body.scrollTop;
    const total = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    if (scrollBar) scrollBar.style.width = (total > 0 ? (current / total) * 100 : 0) + "%";
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

  const revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".reveal").forEach(function (item) {
    revealObserver.observe(item);
  });

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

  const categoryLabels = {
    starters: "Vorspeisen & Nachtisch",
    sparmenu: "Sparmenü",
    hauptgerichte: "Hauptgerichte",
    box: "Box To Go",
    sushi: "Sushi",
    drinks: "Getränke",
    extras: "Extras"
  };

  const categoryTags = {
    vorspeisen: "Starter",
    sparmenu: "Menü",
    hauptgerichte: "Wok",
    nachtisch: "Dessert",
    box: "To Go",
    sushi_maki: "Maki",
    sushi_roll: "Inside-Out",
    baked_sushi: "Baked",
    sushi_menus: "Menü",
    extra_saucen: "Sauce",
    extra: "Extra",
    milchtee: "Milchtee",
    bubble_tea: "Eistee",
    frappe: "Frappé",
    getraenke: "Getränk",
    toppings: "Topping"
  };

  function displayCategory(cat) {
    if (["vorspeisen", "nachtisch"].includes(cat)) return "starters";
    if (["sushi_maki", "sushi_roll", "baked_sushi", "sushi_menus"].includes(cat)) return "sushi";
    if (["extra_saucen", "extra", "toppings"].includes(cat)) return "extras";
    return ["milchtee", "bubble_tea", "frappe", "getraenke"].includes(cat) ? "drinks" : cat;
  }

  function imageFor(id, text, name, desc) {
    const hash = Array.from(id).reduce(function (sum, char) {
      return sum + char.charCodeAt(0);
    }, 0);
    const category = id.split("-")[0];
    const imageOverrides = {
      "nachtisch-N1": "fried banana with honey dessert on white plate asian restaurant close up",
      "box-B2": "fried noodles with spring rolls asian take away box real food photo",
      "extra_saucen-ES1": "two small bowls asian sweet sour sauce and spicy chili sauce close up",
      "extra_saucen-ES5": "single broken fortune cookie with paper fortune on white plate close up",
      "extra-E1": "pickled sushi ginger portion in small dish close up",
      "extra-E2": "wasabi paste portion in small dish sushi restaurant close up",
      "sushi_menus-S1": "sushi platter avocado maki cucumber maki mango maki 24 pieces real photo",
      "sushi_menus-S2": "sushi platter cucumber maki salmon maki avocado maki real photo",
      "sushi_menus-S3": "california maki cucumber maki avocado maki sushi platter real photo",
      "sushi_menus-S4": "paprika maki avocado maki cucumber maki vegetarian sushi platter real photo",
      "sushi_menus-S5": "salmon nigiri salmon maki salmon inside out sushi platter real photo",
      "sushi_menus-S6": "ebi nigiri salmon nigiri cucumber maki california inside out sushi platter real photo",
      "sushi_menus-S7": "salmon inside out california inside out cucumber maki sushi platter real photo",
      "sushi_menus-S8": "vegetarian sushi platter cucumber maki mango maki inside out sesame real photo",
      "sushi_menus-S9": "large sushi platter ebi nigiri salmon nigiri baked salmon roll california maki real photo",
      "sushi_menus-S10": "baked sushi rolls platter salmon ebi vegetarian crispy sushi real photo",
      "sushi_menus-S11": "vegetarian sushi platter baked rolls inside out cucumber mango maki real photo",
      "milchtee-1": "brown sugar milk tea with tapioca pearls cup real photo",
      "milchtee-2": "matcha milk tea bubble tea cup tapioca pearls real photo",
      "milchtee-3": "classic pearl milk tea boba cup real photo",
      "milchtee-4": "taro milk tea bubble tea purple cup real photo",
      "milchtee-5": "strawberry milk tea bubble tea cup real photo",
      "milchtee-6": "mango milk tea bubble tea cup real photo",
      "milchtee-7": "peach milk tea bubble tea cup real photo",
      "milchtee-8": "watermelon milk tea bubble tea cup real photo",
      "milchtee-9": "passion fruit maracuja milk tea bubble tea cup yellow drink real photo",
      "bubble_tea-10": "strawberry fruit iced tea bubble tea cup real photo",
      "bubble_tea-11": "peach fruit iced tea bubble tea cup real photo",
      "bubble_tea-12": "watermelon fruit iced tea bubble tea cup real photo",
      "bubble_tea-13": "mango fruit iced tea bubble tea cup real photo",
      "frappe-14": "strawberry frappe bubble tea cup whipped ice real photo",
      "frappe-15": "mango frappe bubble tea cup whipped ice real photo",
      "getraenke-G2": "cold coca cola light glass bottle with ice glass real product photo",
      "getraenke-G5": "premium still mineral water glass bottle with water glass real product photo",
      "getraenke-G6": "Durstloescher orange drink carton real product photo clean background",
      "getraenke-G7": "red bull energy drink can with ice glass real product photo",
      "getraenke-G12": "guava juice in glass with fresh guava fruit real photo",
      "toppings-T2": "mango popping boba pearls in small clear bowl bubble tea topping real photo",
      "toppings-T8": "cherry popping boba bubble tea topping red pearls close up",
      "toppings-T11": "https://www.kosta.at/wp-content/uploads/2020/06/CFB_2550-2-600x399.jpg"
    };
    const imageHints = {
      vorspeisen: "asian appetizer close up plated dish",
      hauptgerichte: "asian wok dish close up plated meal",
      nachtisch: "asian dessert close up plated",
      box: "asian takeaway box noodles rice close up",
      sparmenu: "asian lunch combo menu noodles rice drink close up",
      extra_saucen: "asian sauce side dish bowl close up",
      sushi_maki: "sushi maki rolls close up",
      sushi_roll: "inside out sushi roll close up",
      baked_sushi: "crispy baked sushi roll close up",
      sushi_menus: "sushi platter maki nigiri rolls close up",
      extra: "sushi condiment ginger wasabi close up",
      milchtee: "bubble milk tea cup close up",
      bubble_tea: "fruit iced bubble tea cup close up",
      frappe: "fruit frappe bubble tea cup close up",
      getraenke: "soft drink bottle glass close up",
      toppings: "bubble tea popping boba topping close up"
    };
    const override = imageOverrides[id];
    if (override && /^https?:\/\//.test(override)) return override;

    const dishQuery = [override || text, name, desc, imageHints[category], "restaurant food real photo centered full dish"]
      .filter(Boolean)
      .join(" ")
      .replace(/\s+/g, " ")
      .trim();
    const query = encodeURIComponent(dishQuery);
    const host = "tse" + ((hash % 4) + 1) + ".mm.bing.net";
    return `https://${host}/th?q=${query}&w=900&h=620&c=7&rs=1&p=${hash % 9}&o=5&pid=1.7`;
  }

  const menuItems = [
    item("vorspeisen", "V1", "Vegetarische Mini-Frühlingsrollen (10 Stück)", "", "4,90 €", "vegetarian mini spring rolls asian appetizer"),
    item("vorspeisen", "V2", "Frühlingsrollen (2 Stück)", "gefüllt mit Hackfleisch, Gemüse", "4,90 €", "fried spring rolls minced meat vegetables"),
    item("vorspeisen", "V3", "Pekingsuppe (sauer-scharf) 🌶", "", "3,90 €", "peking soup hot sour asian soup"),
    item("vorspeisen", "V4", "Thai-Suppe 🌶", "mit Kokosmilch, Garnelen, Champignon und Gemüse", "5,90 €", "thai coconut shrimp soup"),
    item("vorspeisen", "V5", "Wantan-Suppe", "mit Champignon und Sojasprossen", "4,90 €", "wonton soup asian"),
    item("vorspeisen", "V6", "Gemüsesuppe 🌿", "", "3,90 €", "vegetable soup asian"),

    item("sparmenu", "S1", "Sparmenü 1", "Peking Suppe oder Softdrink 0,3L", "13,90 €", "crispy duck fried noodles lunch menu soft drink", null, ["Gebr. Nudeln mit knuspriger Ente und Gemüse"]),
    item("sparmenu", "S2", "Sparmenü 2", "Peking Suppe oder Softdrink 0,3L", "10,90 €", "chicken fried noodles lunch menu soft drink", null, ["Gebr. Nudeln mit Hühnerfleisch und Gemüse"]),
    item("sparmenu", "S3", "Sparmenü 3", "Peking Suppe oder Softdrink 0,3L", "12,90 €", "baked chicken fried noodles lunch menu soft drink", null, ["Gebr. Nudeln mit gebackenem Hühnerfleisch und Gemüse"]),
    item("sparmenu", "S4", "Gebackenes Hühnerfleisch Menü", "mit Reis, Gemüse und Sauce nach Wahl", "11,90 €", "baked chicken rice vegetables sauce lunch menu"),

    item("hauptgerichte", "M1", "Gebratene Nudeln mit...", "", null, "fried noodles asian wok", [
      opt("a", "Sojasprossen, Ei", "6,90 €"),
      opt("b", "Hühnerfleisch, Sojasprossen, Ei", "8,90 €"),
      opt("c", "Rindfleisch, Sojasprossen, Ei", "10,90 €"),
      opt("d", "Garnelen, Gemüse, Ei", "12,90 €")
    ]),
    item("hauptgerichte", "M2", "Gebratener Reis mit...", "", null, "fried rice asian wok", [
      opt("a", "Sojasprossen, Ei", "6,90 €"),
      opt("b", "Hühnerfleisch, Sojasprossen, Ei", "8,90 €"),
      opt("c", "Rindfleisch, Sojasprossen, Ei", "10,90 €"),
      opt("d", "Garnelen, Gemüse, Ei", "12,90 €")
    ]),
    item("hauptgerichte", "M3", "Hühnerbrust paniert", "mit Ei und Sojasprossen, dazu Nudeln und Soße nach Wahl...", "11,90 €", "breaded chicken noodles asian", sauceOptions(["Süß-saure Soße", "Pikante Soße 🌶", "Curry 🌶 oder Erdnusssoße"], "11,90 €")),
    item("hauptgerichte", "M4", "Ente knusprig", "mit Gemüse, dazu Reis und Soße nach Wahl...", "12,90 €", "crispy duck rice asian", sauceOptions(["Süß-saure Soße", "Pikante Soße 🌶", "Curry 🌶 oder Erdnusssoße", "Mangosoße"], "12,90 €")),
    item("hauptgerichte", "M5", "Garnelen gebacken", "mit Ei und Sojasprossen, dazu Nudeln und Soße nach Wahl...", "12,90 €", "baked shrimp noodles asian", sauceOptions(["Süß-saure Soße", "Pikante Soße 🌶", "Curry 🌶 oder Erdnusssoße", "Mangosoße"], "12,90 €")),
    item("hauptgerichte", "M6", "Tofu mit versch. Gemüse 🌿", "dazu Reis und Soße nach Wahl...", "10,90 €", "tofu vegetables rice asian", sauceOptions(["Süß-saure Soße", "Pikante Soße 🌶", "Currysoße 🌶", "Mangosoße"], "10,90 €")),
    item("hauptgerichte", "M7", "Hühnerfleisch Spezialitäten", "dazu Reis...", "10,90 €", "chicken vegetables rice asian", [
      opt("a", "mit Gemüse und Süß-saure Soße", "10,90 €"),
      opt("b", "mit versch. Gemüse und pikanter Soße 🌶", "10,90 €"),
      opt("c", "mit Thai-Curry 🌶 (Kokosmilch, Zitronengras, Gemüse)", "10,90 €"),
      opt("d", "mit Gemüse und Mangosoße", "10,90 €")
    ]),
    item("hauptgerichte", "M8", "Rindfleisch Spezialität", "dazu Reis...", "11,90 €", "beef vegetables rice asian", [
      opt("a", "mit frischem Gemüse und süß-saure Soße", "11,90 €"),
      opt("b", "mit versch. Gemüse und pikanter Soße 🌶", "11,90 €"),
      opt("c", "mit Gemüse und Currysoße 🌶", "11,90 €")
    ]),
    item("hauptgerichte", "M9", "Garnelen gebraten", "mit Gemüse, dazu Reis und Soße nach Wahl...", "12,90 €", "fried shrimp vegetables rice asian", sauceOptions(["Süß-saure Soße", "Pikante Soße 🌶", "Currysoße 🌶"], "12,90 €")),
    item("hauptgerichte", "M10", "Garnelen, Rind-, Hühnerfleisch", "mit frischem Gemüse, Champignons und pikanter Soße 🌶 (dazu Reis)", "12,90 €", "shrimp beef chicken vegetables asian wok"),
    item("hauptgerichte", "M11", "Gebratener Reis", "mit Ei und Sojasprossen", null, "fried rice crispy chicken duck asian", [
      opt("a", "mit gebackenem Hühnerfleisch", "10,90 €"),
      opt("b", "mit knuspriger Ente", "12,90 €")
    ]),
    item("hauptgerichte", "M13", "Gemüsepfanne 🌿", "mit Soße nach Wahl, dazu Reis", "9,90 €", "vegetable stir fry rice asian", sauceOptions(["Süß-saure Soße", "Pikante Soße 🌶", "Currysoße 🌶"], "9,90 €")),
    item("hauptgerichte", "M14", "Bami-Goreng", "Gebratene Nudeln mit Hühnerfleisch, Krabben, Sojasprossen, Ei", "10,90 €", "bami goreng fried noodles"),
    item("hauptgerichte", "M15", "Nasi-Goreng", "Gebratener Reis mit Hühnerfleisch, Krabben, Sojasprossen, Ei", "10,90 €", "nasi goreng fried rice"),
    item("hauptgerichte", "M16", "Knusprige Ente", "mit gebratenen Nudeln, Gemüse und Soße nach Wahl...", "12,90 €", "crispy duck fried noodles vegetables asian", sauceOptions(["Süß-saure Soße", "Chop-Suey Soße", "Curry¹ 🌶 oder Erdnusssoße", "Mangosoße¹"], "12,90 €")),
    item("hauptgerichte", "M17", "Gebackenes Hühnerfleisch", "mit Reis und Soße nach Wahl...", "11,90 €", "baked chicken rice asian", sauceOptions(["Süß-saure Soße", "Chop-Suey Soße", "Curry 🌶 oder Erdnusssoße", "Mangosoße"], "11,90 €")),

    item("nachtisch", "N1", "Gebackene Banane (5 Stück)", "mit Honig", "3,50 €", "fried banana honey dessert"),

    item("box", "B1", "Gebratene Nudeln", "mit vegetarischen Frühlingsrollen (5 Stk.)", "7,90 €", "fried noodles vegetarian spring rolls box"),
    item("box", "B2", "Gebratene Nudeln", "mit Frühlingsrollen (2 Stk.)", "9,90 €", "fried noodles spring rolls box"),
    item("box", "B3", "Gebratene Nudeln", "mit Sojasprossen und Ei", "6,90 €", "fried noodles egg sprouts box"),
    item("box", "B4", "Gebratene Nudeln", "mit Hühnerfleisch, Sojasprossen und Ei", "8,90 €", "fried noodles chicken box"),
    item("box", "B5", "Gebratener Reis", "mit Sojasprossen und Ei", "6,90 €", "fried rice egg sprouts box"),
    item("box", "B6", "Gebratener Reis", "mit Hühnerfleisch, Sojasprossen und Ei", "8,90 €", "fried rice chicken box"),
    item("box", "B7", "Gebratene Nudeln", "mit knuspriger Ente, Sojasprossen und Ei", "11,90 €", "fried noodles crispy duck box"),
    item("box", "B8", "Gebratene Nudeln", "mit gebackenem Hühnerbrustfilet, Sojasprossen und Ei", "10,90 €", "fried noodles baked chicken box"),

    item("extra_saucen", "ES1", "süß-saure Sauce / pikante Sauce", "", "2,00 €", "asian sweet sour sauce"),
    item("extra_saucen", "ES2", "Curry-, Erdnuss- oder Mangosauce", "", "2,50 €", "asian curry peanut mango sauce"),
    item("extra_saucen", "ES3", "gekochter Reis", "", null, "steamed rice bowl", [opt("klein", "gekochter Reis", "2,00 €"), opt("groß", "gekochter Reis", "2,50 €")]),
    item("extra_saucen", "ES4", "gebackene Asia Krupuk", "", "2,50 €", "asia krupuk crackers"),
    item("extra_saucen", "ES5", "Glückskeks", "", "0,50 €", "fortune cookie"),
    item("extra_saucen", "ES6", "Sambal Olek 🌶", "", "0,50 €", "sambal oelek chili sauce"),

    item("sushi_maki", "M1", "24 Avocado Maki", "", "10,90 €", "avocado maki sushi"),
    item("sushi_maki", "M2", "24 Gurken Maki", "", "9,90 €", "cucumber maki sushi"),
    item("sushi_maki", "M3", "24 Mango Maki", "", "9,90 €", "mango maki sushi"),
    item("sushi_maki", "M4", "24 Paprika Maki", "", "9,90 €", "paprika maki sushi"),
    item("sushi_maki", "M5", "24 Lachs Maki", "", "12,90 €", "salmon maki sushi"),
    item("sushi_maki", "M6", "24 California Maki", "", "9,90 €", "california maki sushi"),

    item("sushi_roll", "R1", "Ebi Inside-Out", "Garnelen, Gurke, und Sesam ummantelt", "10,90 €", "ebi inside out sushi roll"),
    item("sushi_roll", "R2", "Sake Inside-Out", "Lachs, Gurke, und Sesam ummantelt", "10,90 €", "sake inside out sushi roll"),
    item("sushi_roll", "R3", "Alaska Inside-Out", "Lachs, Gurke, Masago und Sesam ummantelt", "10,90 €", "alaska inside out sushi roll"),
    item("sushi_roll", "R4", "California Inside-Out", "Krebsfleischimitat, Avocado und Sesam ummantelt", "9,90 €", "california inside out sushi"),
    item("sushi_roll", "R5", "California Inside-Out", "Krebsfleischimitat, Avocado, Masago u. Lachs ummantelt", "10,90 €", "california salmon masago inside out sushi"),
    item("sushi_roll", "R6", "Vegetarische Roll", "Gurke, Avocado, Mango und Sesam ummantelt", "8,90 €", "vegetarian inside out sushi roll"),

    item("baked_sushi", "B1", "Vegetarische Roll", "Gurke, Avocado, Mango und Frischkäse", "8,90 €", "baked vegetarian sushi roll"),
    item("baked_sushi", "B2", "Sake Roll", "Lachs, Gurke, Avocado und Frischkäse", "10,90 €", "baked sake salmon sushi roll"),
    item("baked_sushi", "B3", "Ebi Roll", "panierte Garnelen, Gurke, Avocado und Frischkäse", "10,90 €", "baked ebi shrimp sushi roll"),
    item("baked_sushi", "B4", "Yakitori Roll", "gebackenes Hühnerfleisch, Gurke und Frischkäse", "10,90 €", "baked chicken yakitori sushi roll"),

    sushiMenu("S1", "Sushi Menü 1", "9,90 €", ["8 Avocado Maki", "8 Kappa Maki (Gurke)", "8 Mango Maki"]),
    sushiMenu("S2", "Sushi Menü 2", "10,90 €", ["8 Kappa Maki (Gurke)", "8 Lachs Maki", "8 Avocado Maki"]),
    sushiMenu("S3", "Sushi Menü 3", "9,90 €", ["8 California Maki", "8 Gurke Maki", "8 Avocado Maki"]),
    sushiMenu("S4", "Sushi Menü 4", "9,90 €", ["8 Paprika Maki", "8 Avocado Maki", "8 Gurke Maki"]),
    sushiMenu("S5", "Sushi Menü 5", "17,90 €", ["2 Sake Nigiri", "8 Sake Maki", "8 Sake Inside-Out (Lachs ummantelt)"]),
    sushiMenu("S6", "Sushi Menü 6", "15,90 €", ["1 Ebi Nigiri", "1 Sake Nigiri", "8 Gurke Maki", "8 California Inside-Out (Lachs ummantelt)"]),
    sushiMenu("S7", "Sushi Menü 7", "19,90 €", ["8 Gurke Maki", "8 Sake Inside-Out (Lachs ummantelt)", "8 California Inside-Out (Lachs ummantelt)"]),
    sushiMenu("S8", "Sushi Menü 8 (vegetarisch)", "13,90 €", ["8 Kappa Maki (Gurke)", "8 Mango Maki", "8 Inside-Out (Sesam ummantelt)"]),
    sushiMenu("S9", "Sushi Menü 9", "25,90 €", ["2 Ebi Nigiri", "2 Sake Nigiri", "6 Baked Sake Rolls", "8 California Inside-Out (Sesam ummantelt)", "8 Kappa Maki"]),
    sushiMenu("S10", "Sushi Menü 10", "27,90 €", ["6 Baked Sake Rolls", "6 Baked Ebi Rolls", "6 Baked vegetarische Rolls"]),
    sushiMenu("S11", "Sushi Menü 11 (vegetarisch)", "22,90 €", ["6 Baked Rolls", "8 Vegetarisch Inside-Out (Sesam ummantelt)", "8 Kappa Maki", "8 Mango Maki"]),

    item("extra", "E1", "Portion Ingwer", "", "1,00 €", "sushi ginger"),
    item("extra", "E2", "Portion Wasabi", "", "1,00 €", "wasabi portion"),

    drink("milchtee", "1", "Brownsugar Milchtee", "brown sugar milk tea boba", [["700ml", "5,00 €"], ["500ml", "4,50 €"]]),
    drink("milchtee", "2", "Matcha Milchtee", "matcha milk tea boba", [["700ml", "5,00 €"], ["500ml", "4,50 €"]]),
    drink("milchtee", "3", "Perlen Milchtee", "pearl milk tea boba", [["700ml", "5,00 €"], ["500ml", "4,50 €"]]),
    drink("milchtee", "4", "Taro Milchtee", "taro milk tea boba", [["700ml", "5,00 €"], ["500ml", "4,50 €"]]),
    drink("milchtee", "5", "Erdbeere Milchtee", "strawberry milk tea boba", [["700ml", "5,00 €"], ["500ml", "4,50 €"]]),
    drink("milchtee", "6", "Mango Milchtee", "mango milk tea boba", [["700ml", "5,00 €"], ["500ml", "4,50 €"]]),
    drink("milchtee", "7", "Pfirsich Milchtee", "peach milk tea boba", [["700ml", "5,00 €"], ["500ml", "4,50 €"]]),
    drink("milchtee", "8", "Wassermelone Milchtee", "watermelon milk tea boba", [["700ml", "5,00 €"], ["500ml", "4,50 €"]]),
    drink("milchtee", "9", "Maracuja Milchtee", "passion fruit milk tea boba", [["700ml", "5,00 €"], ["500ml", "4,50 €"]]),

    drink("bubble_tea", "10", "Erdbeere Eistee", "strawberry iced tea boba", [["700ml", "5,00 €"], ["500ml", "4,50 €"]]),
    drink("bubble_tea", "11", "Pfirsich Eistee", "peach iced tea boba", [["700ml", "5,00 €"], ["500ml", "4,50 €"]]),
    drink("bubble_tea", "12", "Wassermelone Eistee", "watermelon iced tea boba", [["700ml", "5,00 €"], ["500ml", "4,50 €"]]),
    drink("bubble_tea", "13", "Mango Eistee", "mango iced tea boba", [["700ml", "5,00 €"], ["500ml", "4,50 €"]]),

    drink("frappe", "14", "Erdbeere Frappé", "strawberry frappe bubble tea", [["700ml", "5,50 €"], ["500ml", "5,00 €"]]),
    drink("frappe", "15", "Mango Frappé", "mango frappe bubble tea", [["700ml", "5,50 €"], ["500ml", "5,00 €"]]),

    beverage("G1", "Cola", "coca cola glass bottle soft drink", [["Haus 0,33L", "2,50 €"], ["Außer Haus 0,33L", "2,90 €"], ["Außer Haus 1L", "4,90 €"]]),
    beverage("G2", "Cola Zero", "cola zero glass bottle soft drink", [["Haus 0,33L", "2,50 €"], ["Außer Haus 0,33L", "2,90 €"], ["Außer Haus 1L", "4,90 €"]]),
    beverage("G3", "Fanta", "fanta orange soft drink bottle", [["Haus 0,33L", "2,50 €"], ["Außer Haus 0,33L", "2,90 €"], ["Außer Haus 1L", "4,90 €"]]),
    beverage("G4", "Sprite", "sprite lemon lime soft drink bottle", [["Haus 0,33L", "2,50 €"], ["Außer Haus 0,33L", "2,90 €"], ["Außer Haus 1L", "4,90 €"]]),
    beverage("G5", "Stilles Wasser", "still water bottle glass", [["Haus 0,33L", "1,90 €"], ["Außer Haus 1L", "3,90 €"]]),
    beverage("G6", "Durstlöscher", "durstloescher orange iced tea drink carton", [["Haus 0,5L", "2,00 €"], ["Außer Haus 0,5L", "2,50 €"]]),
    beverage("G7", "Red Bull", "red bull can energy drink", [["Haus", "2,90 €"], ["Außer Haus", "3,90 €"]]),
    beverage("G8", "Kaffee", "hot coffee cup", [["Haus", "1,90 €"]]),
    beverage("G9", "Apfelschorle / Tafelwasser", "apple spritzer sparkling water bottle drink", [["Haus 0,33L", "2,50 €"]]),
    beverage("G10", "Mangosaft", "mango juice glass bottle", [["Haus 250ml", "2,90 €"], ["Außer Haus 250ml", "2,90 €"]]),
    beverage("G11", "Lycheesaft", "lychee juice glass bottle", [["Haus 250ml", "2,90 €"], ["Außer Haus 250ml", "2,90 €"]]),
    beverage("G12", "Guavensaft", "guava juice glass bottle", [["Haus 250ml", "2,90 €"], ["Außer Haus 250ml", "2,90 €"]]),

    topping("T1", "Erdbeere Boba"),
    topping("T2", "Mango Boba"),
    topping("T3", "Pfirsich Boba"),
    topping("T4", "Maracuja Boba"),
    topping("T5", "Wassermelone Boba"),
    topping("T6", "Apfel Boba"),
    topping("T7", "Litchi Boba"),
    topping("T8", "Kirsche Boba"),
    topping("T9", "Tapioka Perlen"),
    topping("T10", "Hantien Perlen"),
    topping("T11", "Früchte Gelee")
  ];

  const allergenLabels = {
    "vorspeisen-V1": "3",
    "vorspeisen-V2": "3",
    "vorspeisen-V3": "1,A",
    "vorspeisen-V4": "3,A,C,F",
    "vorspeisen-V5": "3,E,F",
    "vorspeisen-V6": "3",
    "sparmenu-S1": "3,A,C,F",
    "sparmenu-S2": "3,A,C,F",
    "sparmenu-S3": "3,A,C,F",
    "sparmenu-S4": "3,A",
    "hauptgerichte-M1": "3,E,F",
    "hauptgerichte-M2": "3,E,F",
    "hauptgerichte-M3": "3,A,C,F",
    "hauptgerichte-M4": "3,A",
    "hauptgerichte-M5": "3,E,F",
    "hauptgerichte-M6": "3,F",
    "hauptgerichte-M7": "3,A,C,F",
    "hauptgerichte-M8": "3",
    "hauptgerichte-M9": "3",
    "hauptgerichte-M10": "3,D",
    "hauptgerichte-M11": "3,F",
    "hauptgerichte-M13": "3,F",
    "hauptgerichte-M14": "3,E,F",
    "hauptgerichte-M15": "3,E,F",
    "hauptgerichte-M16": "3",
    "hauptgerichte-M17": "3,A",
    "nachtisch-N1": "3",
    "box-B1": "3,E,F",
    "box-B2": "3,A,F",
    "box-B3": "3,E,F",
    "box-B4": "3,E,F",
    "box-B5": "3,E,F",
    "box-B6": "3,E,F",
    "box-B7": "3,E,F",
    "box-B8": "3,A,C,F",
    "sushi_maki-M1": "A",
    "sushi_maki-M2": "A",
    "sushi_maki-M3": "A",
    "sushi_maki-M4": "A",
    "sushi_maki-M5": "A,D",
    "sushi_maki-M6": "A,B",
    "sushi_roll-R1": "A,D,G",
    "sushi_roll-R2": "A,D,G",
    "sushi_roll-R3": "A,D",
    "sushi_roll-R4": "A,B",
    "sushi_roll-R5": "A,B",
    "sushi_roll-R6": "A,B",
    "baked_sushi-B1": "A,C,F",
    "baked_sushi-B2": "A,D,G",
    "baked_sushi-B3": "A,F,G",
    "baked_sushi-B4": "A,F,G",
    "sushi_menus-S1": "A",
    "sushi_menus-S2": "A,D",
    "sushi_menus-S3": "A,B",
    "sushi_menus-S4": "A",
    "sushi_menus-S5": "A,D",
    "sushi_menus-S6": "A,B,D",
    "sushi_menus-S7": "A,D",
    "sushi_menus-S8": "A",
    "sushi_menus-S9": "A,B,D",
    "sushi_menus-S10": "A,B,D",
    "sushi_menus-S11": "A",
    "milchtee-1": "1,A",
    "milchtee-2": "1,A",
    "milchtee-3": "1,A",
    "milchtee-4": "1,B",
    "milchtee-5": "1,A",
    "milchtee-6": "1,A",
    "milchtee-7": "1,A",
    "milchtee-8": "1,A",
    "milchtee-9": "1,A",
    "bubble_tea-10": "1",
    "bubble_tea-11": "1",
    "bubble_tea-12": "1",
    "bubble_tea-13": "1",
    "frappe-14": "1,A",
    "frappe-15": "1,A",
    "getraenke-G1": "1,5",
    "getraenke-G2": "1,5,6",
    "getraenke-G3": "1,2",
    "getraenke-G4": "1"
  };

  menuItems.forEach(function (item) {
    item.allergens = allergenLabels[item.id] || "";
  });

  function item(cat, code, name, desc, price, imageText, options, bullets) {
    return {
      id: cat + "-" + code,
      cat,
      code,
      name,
      desc,
      price,
      tag: categoryTags[cat],
      img: imageFor(cat + "-" + code, imageText || name, name, desc),
      options: options || [],
      bullets: bullets || []
    };
  }

  function opt(label, text, price) {
    return { label, text, price };
  }

  function sauceOptions(names, price) {
    return names.map(function (name, index) {
      return opt(String.fromCharCode(97 + index), name, price);
    });
  }

  function sushiMenu(code, name, price, bullets) {
    return item("sushi_menus", code, name, "", price, name + " sushi platter", null, bullets);
  }

  function drink(cat, code, name, imageText, sizes) {
    return {
      id: cat + "-" + code,
      cat,
      code,
      name,
      desc: "Mit Topping nach Wahl inklusive. Extra Topping +1€",
      price: null,
      tag: categoryTags[cat],
      img: imageFor(cat + "-" + code, imageText, name, "bubble tea size 500ml 700ml"),
      sizes: sizes.map(function (size) {
        return { label: size[0], price: size[1] };
      }),
      options: [],
      bullets: ["Toppings: Boba, Tapioka Perlen, Hantien Perlen oder Früchte Gelee inklusive. Extra Topping +1€"]
    };
  }

  function beverage(code, name, imageText, sizes) {
    return {
      id: "getraenke-" + code,
      cat: "getraenke",
      code,
      name,
      desc: "",
      price: null,
      tag: categoryTags.getraenke,
      img: imageFor("getraenke-" + code, imageText, name, "drinks in house take away"),
      sizes: sizes.map(function (size) {
        return { label: size[0], price: size[1] };
      }),
      options: [],
      bullets: []
    };
  }

  function topping(code, name) {
    return item("toppings", code, name, "Topping für Bubble Tea / Milchtee / Frappé", "+1,00 €", name + " bubble tea topping");
  }

  function escapeHtml(value) {
    return String(value || "").replace(/[&<>"']/g, function (char) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#39;" }[char];
    });
  }

  function fallbackImage(name) {
    const query = encodeURIComponent(`${name} asian restaurant food real photo centered dish`);
    return `https://tse3.mm.bing.net/th?q=${query}&w=900&h=620&c=7&rs=1&p=7&o=5&pid=1.7`;
  }
  window.fallbackImage = fallbackImage;

  function optionsHtml(item) {
    if (item.sizes && item.sizes.length) {
      return `<div class="size-list">${item.sizes.map(function (size) {
        return `<div class="size-row"><span>${escapeHtml(size.label)}</span><span class="size-price">${escapeHtml(size.price)}</span></div>`;
      }).join("")}</div>`;
    }

    if (item.options && item.options.length) {
      return `<div class="option-list">${item.options.map(function (option) {
        return `<div class="option-row"><span><strong>${escapeHtml(option.label)}.</strong> ${escapeHtml(option.text)}</span><span class="option-price">${escapeHtml(option.price)}</span></div>`;
      }).join("")}</div>`;
    }

    return "";
  }

  function bulletsHtml(item) {
    if (!item.bullets || !item.bullets.length) return "";
    return `<ul class="bullet-list">${item.bullets.map(function (line) {
      return `<li>${escapeHtml(line)}</li>`;
    }).join("")}</ul>`;
  }

  function card(item, index) {
    const fallbackName = item.name.replace(/'/g, "");
    const isSimple = !item.options?.length && !item.sizes?.length && !item.bullets?.length;
    return `
      <article class="food-card ${isSimple ? "is-simple" : ""} reveal" data-cat="${escapeHtml(item.cat)}" style="animation-delay:${Math.min(0.035 * index, 0.45)}s">
        <div class="food-img-wrap">
          <img class="food-img" src="${escapeHtml(item.img)}" alt="${escapeHtml(item.name)}" loading="lazy" onerror="this.onerror=null;this.src=fallbackImage('${escapeHtml(fallbackName)}')">
        </div>
        <div class="food-content">
          <div class="food-heading">
            <span class="food-code">${escapeHtml(item.code)}</span>
            <div class="food-title">
              <h3 class="food-name">${escapeHtml(item.name)}${item.allergens ? ` <sup class="food-allergens">${escapeHtml(item.allergens)}</sup>` : ""}</h3>
            </div>
          </div>
          ${item.desc ? `<p class="food-desc">${escapeHtml(item.desc)}</p>` : ""}
          ${optionsHtml(item)}
          ${bulletsHtml(item)}
          <div class="food-meta"><span class="food-tag">${escapeHtml(item.tag)}</span></div>
          ${item.price ? `<div class="food-price">${escapeHtml(item.price)}</div>` : ""}
        </div>
      </article>
    `;
  }

  function renderTabs() {
    const toolbar = document.querySelector(".menu-toolbar");
    if (!toolbar) return;
    toolbar.innerHTML = `<button class="menu-tab active" data-filter="all">Alle</button>` + Object.keys(categoryLabels).map(function (cat) {
      return `<button class="menu-tab" data-filter="${cat}">${categoryLabels[cat]}</button>`;
    }).join("");
    menuTabs = document.querySelectorAll(".menu-tab");
    bindTabs();
  }

  function renderMenu() {
    if (!menuRows) return;
    const query = (menuSearch ? menuSearch.value : "").toLowerCase().trim();
    const filtered = menuItems.filter(function (item) {
      const options = (item.options || []).map(function (option) { return option.label + " " + option.text + " " + option.price; }).join(" ");
      const sizes = (item.sizes || []).map(function (size) { return size.label + " " + size.price; }).join(" ");
      const bullets = (item.bullets || []).join(" ");
      const haystack = `${item.code} ${item.name} ${item.desc} ${item.allergens || ""} ${item.price || ""} ${item.tag} ${options} ${sizes} ${bullets}`.toLowerCase();
      const displayCat = displayCategory(item.cat);
      return (currentFilter === "all" || displayCat === currentFilter) && haystack.includes(query);
    });

    const cats = currentFilter === "all" ? Object.keys(categoryLabels) : [currentFilter];
    menuRows.innerHTML = cats.map(function (cat) {
      const rowItems = filtered.filter(function (item) { return displayCategory(item.cat) === cat; });
      if (!rowItems.length) return "";
      return `
        <div class="menu-row-block ${rowItems.length <= 3 ? "is-compact" : ""}" data-category="${cat}">
          <div class="row-title">
            <h3>${categoryLabels[cat]}</h3>
            <span>${rowItems.length} Positionen</span>
          </div>
          <div class="wave-stage">
            <div class="wave-menu-track">${rowItems.map(card).join("")}</div>
          </div>
        </div>
      `;
    }).join("") || '<div class="section-head"><p>Keine Gerichte gefunden.</p></div>';

    document.querySelectorAll("#menuRows .reveal").forEach(function (item) {
      requestAnimationFrame(function () { item.classList.add("show"); });
    });
  }

  function bindTabs() {
    menuTabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        menuTabs.forEach(function (item) { item.classList.remove("active"); });
        tab.classList.add("active");
        currentFilter = tab.dataset.filter || "all";
        if (menuSearch) menuSearch.value = "";
        renderMenu();
      });
    });
  }

  function setupMenuRows() {
    document.querySelectorAll(".menu-row-block").forEach(function (block) {
      const track = block.querySelector(".wave-menu-track");
      if (!track) return;
      block.querySelector(".slide-left")?.addEventListener("click", function () {
        slideTrack(track, -1);
      });
      block.querySelector(".slide-right")?.addEventListener("click", function () {
        slideTrack(track, 1);
      });
      track.addEventListener("scroll", function () {
        updateActiveCard(track);
      }, { passive: true });
      updateTrackAlignment(track);
      updateActiveCard(track);
    });
  }

  function updateTrackAlignment(track) {
    track.classList.remove("is-centered");
    track.classList.toggle("is-centered", track.scrollWidth <= track.clientWidth + 8);
  }

  function updateActiveCard(track) {
    const cards = Array.from(track.querySelectorAll(".food-card"));
    if (!cards.length) return;
    const center = track.getBoundingClientRect().left + track.clientWidth / 2;
    let active = cards[0];
    let best = Number.POSITIVE_INFINITY;
    cards.forEach(function (cardElement) {
      const rect = cardElement.getBoundingClientRect();
      const distance = Math.abs(center - (rect.left + rect.width / 2));
      if (distance < best) {
        best = distance;
        active = cardElement;
      }
    });
    cards.forEach(function (cardElement) {
      cardElement.classList.toggle("is-active", cardElement === active);
    });
  }

  function slideTrack(track, direction) {
    const maxScroll = track.scrollWidth - track.clientWidth;
    if (maxScroll <= 8) return;
    const step = Math.min(380, track.clientWidth * 0.8) * direction;
    let next = track.scrollLeft + step;
    if (next >= maxScroll - 12) next = 0;
    if (next < 0) next = maxScroll;
    track.scrollTo({ left: next, behavior: "smooth" });
    setTimeout(function () { updateActiveCard(track); }, 620);
  }

  function startAutoSlide() {
    clearInterval(autoSlideTimer);
  }

  document.addEventListener("mouseenter", function (event) {
    if (event.target.closest(".wave-menu-track")) clearInterval(autoSlideTimer);
  }, true);

  document.addEventListener("mouseleave", function (event) {
    if (event.target.closest(".wave-menu-track")) startAutoSlide();
  }, true);

  window.addEventListener("resize", function () {
    document.querySelectorAll(".wave-menu-track").forEach(function (track) {
      updateTrackAlignment(track);
      updateActiveCard(track);
    });
  });

  if (menuSearch) menuSearch.addEventListener("input", renderMenu);

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

  document.addEventListener("click", function (event) {
    const target = event.target;
    if (target.closest(".food-img")) {
      const image = target.closest(".food-img");
      openLightbox(image.src, image.alt);
    }
  });

  const closeButton = document.getElementById("lightboxClose");
  if (closeButton) closeButton.addEventListener("click", function () { lightbox.classList.remove("active"); });
  lightbox.addEventListener("click", function (event) {
    if (event.target === lightbox) lightbox.classList.remove("active");
  });

  renderTabs();
  renderMenu();
});
