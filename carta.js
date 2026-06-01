const CARTA_DB = {
  es: [
    {
      "categoria": "Aperitivos",
      "platos": [
        {"nombre": "Cachonditas", "desc": "Aceituna gordal clásica con cebolla y pimiento picante", "precio": "4€"},
        {"nombre": "Pampa", "desc": "Aceituna gordal al chimichurri argentino", "precio": "4.50€"},
        {"nombre": "Ibéricas", "desc": "Aceituna gordal con sabor a jamón de Jabugo", "precio": "5€"},
        {"nombre": "Piamonte", "desc": "Aceituna gordal aliñada con trufa blanca", "precio": "5€"},
        {"nombre": "Gilda Clásica con Anchoa del Cantábrico", "desc": "", "precio": "3€"},
        {"nombre": "Gilda de Boquerón en Vinagre", "desc": "", "precio": "3€"},
        {"nombre": "Gilda Matrimonio", "desc": "Con anchoa y boquerón", "precio": "3€"},
        {"nombre": "Gilda de Trufa y Queso Curado", "desc": "Con tomate seco", "precio": "3.50€"}
      ]
    },
    {
      "categoria": "Tapas",
      "platos": [
        {"nombre": "Albóndigas a la Catalana", "desc": "Salsa de tomate casera", "precio": "12.90€"},
        {"nombre": "Canelones de Setas", "desc": "Con bechamel de trufa", "precio": "15€"},
        {"nombre": "Alcachofas de Tudela Confitadas", "desc": "Jamón ibérico y yema", "precio": "19€"},
        {"nombre": "Carrillera de Cerdo Guisada al Vino Tinto", "desc": "Con puré cremoso", "precio": "17.90€"},
        {"nombre": "Pan de Coca con Tomate y AOVE", "desc": "", "precio": "4.50€"},
        {"nombre": "Patatas Bravas de la Casa", "desc": "All i oli cítrico y salsa chipotle", "precio": "8€"},
        {"nombre": "Boniato Frito con Miel de Trufa y Flor de Sal", "desc": "", "precio": "10.90€"},
        {"nombre": "Ensaladilla Rusa", "desc": "Ventresca y huevo", "precio": "10€"},
        {"nombre": "Coca Artesana", "desc": "Ricotta, pesto y jamón serrano", "precio": "13€"},
        {"nombre": "Choricitos Asturianos a la Sidra", "desc": "", "precio": "11€"},
        {"nombre": "Albóndigas de Espinacas y Mozzarella", "desc": "Ragú de tomate", "precio": "12.90€"},
        {"nombre": "Tiras de Pollo Rebozadas", "desc": "Salsa miel y mostaza", "precio": "13.90€"},
        {"nombre": "Alitas de Pollo Confitadas", "desc": "Mayonesa de kimchi", "precio": "13.90€"},
        {"nombre": "Carpaccio de Ternera", "desc": "Parmesano y AOVE", "precio": "13.90€"},
        {"nombre": "Tabla de Jamón Ibérico Cortado a Cuchillo", "desc": "", "precio": "25€"}
      ]
    },
    {
      "categoria": "Nuestras Tortillas",
      "platos": [
        {"nombre": "Clásica", "desc": "", "precio": "6.90€"},
        {"nombre": "Sobrasada y Brie", "desc": "", "precio": "7.90€"},
        {"nombre": "Pimiento Verde y Butifarra", "desc": "", "precio": "7.90€"},
        {"nombre": "Setas", "desc": "", "precio": "7.90€"},
        {"nombre": "Jamón Ibérico y Trufa Negra", "desc": "", "precio": "8.90€"},
        {"nombre": "Especial del Día", "desc": "Pregúntanos", "precio": "—"}
      ]
    },
    {
      "categoria": "Croquetas Artesanales",
      "platos": [
        {"nombre": "Jamón Ibérico", "desc": "", "precio": "8€"},
        {"nombre": "Bacalao", "desc": "", "precio": "8€"},
        {"nombre": "Pollo", "desc": "", "precio": "8€"},
        {"nombre": "Rabo de Toro", "desc": "", "precio": "9€"},
        {"nombre": "Chipirón en su Tinta", "desc": "", "precio": "9€"}
      ]
    },
    {
      "categoria": "Latas",
      "platos": [
        {"nombre": "Sardinas Picantes", "desc": "", "precio": "8.50€"},
        {"nombre": "Sardinas en AOVE", "desc": "", "precio": "8.50€"},
        {"nombre": "Mejillones en Escabeche Premium", "desc": "", "precio": "8.50€"},
        {"nombre": "Almejas al Natural", "desc": "", "precio": "10.50€"},
        {"nombre": "Pulpo en Aceite de Oliva o Salsa Gallega", "desc": "", "precio": "10.50€"},
        {"nombre": "Berberechos al Natural", "desc": "", "precio": "12.50€"}
      ]
    },
    {
      "categoria": "Postres",
      "platos": [
        {"nombre": "Coulant de Chocolate", "desc": "", "precio": "5€"},
        {"nombre": "Brownie de Chocolate", "desc": "", "precio": "5€"},
        {"nombre": "Coulant de Queso Manchego", "desc": "", "precio": "6€"},
        {"nombre": "Tarta de Queso Manchego", "desc": "", "precio": "6€"},
        {"nombre": "Tarta Sacher", "desc": "", "precio": "7€"}
      ]
    },
    {
      "categoria": "Cocktails",
      "platos": [
        {"nombre": "Melon Breeze", "desc": "Dulce · Fresco · Picante — Vodka premium con la suavidad del melón y la intensidad exótica de la fruta de la pasión", "precio": "11€"},
        {"nombre": "Red Sky", "desc": "Cremoso · Floral · Sofisticado — Ginebra aromática con frutos del bosque, esencia de rosas y un toque cítrico refrescante", "precio": "12€"},
        {"nombre": "Peach Breeze", "desc": "Ahumado · Afrutado · Seductor — Whisky escocés con melocotón maduro que crea una base intensa y jugosa con vainilla cálida", "precio": "12€"},
        {"nombre": "Mimosa", "desc": "Zumo de naranja natural combinado con vino espumoso, fresco y fácil de beber.", "precio": "4€"},
        {"nombre": "Mojito", "desc": "Ron blanco, lima, hierbabuena fresca, azúcar y soda. Equilibrado y muy bebible.", "precio": "9€"},
        {"nombre": "Sex on the Beach", "desc": "Vodka, licor de melocotón, zumo de naranja y arándanos. Suave y desenfadado.", "precio": "10€"},
        {"nombre": "Espresso Martini", "desc": "Vodka, café espresso recién hecho y licor de café. Cremoso y con carácter.", "precio": "10€"},
        {"nombre": "Paloma", "desc": "Tequila Patrón, zumo de lima y refresco de pomelo. Cítrico, ligeramente amargo, limpio y equilibrado.", "precio": "12€"}
      ]
    }
  ],
  en: [
    {
      "categoria": "Appetizers",
      "platos": [
        {"nombre": "Cachonditas", "desc": "Classic gordal olive with onion and spicy pepper", "precio": "4€"},
        {"nombre": "Pampa", "desc": "Gordal olive with Argentine chimichurri", "precio": "4.50€"},
        {"nombre": "Ibéricas", "desc": "Gordal olive with Jabugo ham flavor", "precio": "5€"},
        {"nombre": "Piamonte", "desc": "Gordal olive dressed with white truffle", "precio": "5€"},
        {"nombre": "Classic Gilda with Cantabrian Anchovy", "desc": "", "precio": "3€"},
        {"nombre": "Pickled Anchovy Gilda", "desc": "", "precio": "3€"},
        {"nombre": "Matrimonio Gilda", "desc": "With salted and pickled anchovy", "precio": "3€"},
        {"nombre": "Truffle & Cured Cheese Gilda", "desc": "With sun-dried tomato", "precio": "3.50€"}
      ]
    },
    {
      "categoria": "Tapas",
      "platos": [
        {"nombre": "Catalan Style Meatballs", "desc": "Homemade tomato sauce", "precio": "12.90€"},
        {"nombre": "Mushroom Cannelloni", "desc": "With truffle béchamel", "precio": "15€"},
        {"nombre": "Confit Tudela Artichokes", "desc": "Iberian ham and cured egg yolk", "precio": "19€"},
        {"nombre": "Red Wine Stewed Pork Cheek", "desc": "With creamy puree", "precio": "17.90€"},
        {"nombre": "Coca Bread with Tomato and EVOO", "desc": "", "precio": "4.50€"},
        {"nombre": "House Patatas Bravas", "desc": "Citrus alioli and chipotle sauce", "precio": "8€"},
        {"nombre": "Fried Sweet Potato", "desc": "With truffle honey and sea salt", "precio": "10.90€"},
        {"nombre": "Russian Salad", "desc": "Tuna belly and egg", "precio": "10€"},
        {"nombre": "Artisan Coca", "desc": "Ricotta, pesto and serrano ham", "precio": "13€"},
        {"nombre": "Asturian Chorizo in Cider", "desc": "", "precio": "11€"},
        {"nombre": "Spinach & Mozzarella Meatballs", "desc": "Tomato ragout", "precio": "12.90€"},
        {"nombre": "Breaded Chicken Strips", "desc": "Honey mustard sauce", "precio": "13.90€"},
        {"nombre": "Confit Chicken Wings", "desc": "Kimchi mayonnaise", "precio": "13.90€"},
        {"nombre": "Beef Carpaccio", "desc": "Parmesan and EVOO", "precio": "13.90€"},
        {"nombre": "Hand-cut Iberian Ham Platter", "desc": "", "precio": "25€"}
      ]
    },
    {
      "categoria": "Our Omelets",
      "platos": [
        {"nombre": "Classic", "desc": "", "precio": "6.90€"},
        {"nombre": "Sobrasada and Brie", "desc": "", "precio": "7.90€"},
        {"nombre": "Green Pepper and Butifarra", "desc": "", "precio": "7.90€"},
        {"nombre": "Mushrooms", "desc": "", "precio": "7.90€"},
        {"nombre": "Iberian Ham and Black Truffle", "desc": "", "precio": "8.90€"},
        {"nombre": "Daily Special", "desc": "Ask us", "precio": "—"}
      ]
    },
    {
      "categoria": "Artisan Croquettes",
      "platos": [
        {"nombre": "Iberian Ham", "desc": "", "precio": "8€"},
        {"nombre": "Cod", "desc": "", "precio": "8€"},
        {"nombre": "Chicken", "desc": "", "precio": "8€"},
        {"nombre": "Oxtail", "desc": "", "precio": "9€"},
        {"nombre": "Baby Squid in Ink", "desc": "", "precio": "9€"}
      ]
    },
    {
      "categoria": "Canned Goods",
      "platos": [
        {"nombre": "Spicy Sardines", "desc": "", "precio": "8.50€"},
        {"nombre": "Sardines in EVOO", "desc": "", "precio": "8.50€"},
        {"nombre": "Premium Pickled Mussels", "desc": "", "precio": "8.50€"},
        {"nombre": "Natural Clams", "desc": "", "precio": "10.50€"},
        {"nombre": "Octopus in Olive Oil or Galician Sauce", "desc": "", "precio": "10.50€"},
        {"nombre": "Natural Cockles", "desc": "", "precio": "12.50€"}
      ]
    },
    {
      "categoria": "Desserts",
      "platos": [
        {"nombre": "Chocolate Coulant", "desc": "", "precio": "5€"},
        {"nombre": "Chocolate Brownie", "desc": "", "precio": "5€"},
        {"nombre": "Manchego Cheese Coulant", "desc": "", "precio": "6€"},
        {"nombre": "Manchego Cheese Cake", "desc": "", "precio": "6€"},
        {"nombre": "Sacher Cake", "desc": "", "precio": "7€"}
      ]
    },
    {
      "categoria": "Cocktails",
      "platos": [
        {"nombre": "Melon Breeze", "desc": "Sweet · Fresh · Spicy — Premium vodka with the smoothness of melon and the exotic intensity of passion fruit", "precio": "11€"},
        {"nombre": "Red Sky", "desc": "Creamy · Floral · Sophisticated — Aromatic gin with berries, rose essence and a refreshing citrus touch", "precio": "12€"},
        {"nombre": "Peach Breeze", "desc": "Smoky · Fruity · Seductive — Scotch whisky with ripe peach creating an intense and juicy base with warm vanilla", "precio": "12€"},
        {"nombre": "Mimosa", "desc": "Natural orange juice combined with sparkling wine, fresh and easy to drink.", "precio": "4€"},
        {"nombre": "Mojito", "desc": "White rum, lime, fresh mint, sugar and soda. Balanced and very drinkable.", "precio": "9€"},
        {"nombre": "Sex on the Beach", "desc": "Vodka, peach liqueur, orange and cranberry juice. Smooth and casual.", "precio": "10€"},
        {"nombre": "Espresso Martini", "desc": "Vodka, freshly brewed espresso and coffee liqueur. Creamy and with character.", "precio": "10€"},
        {"nombre": "Paloma", "desc": "Patrón Tequila, lime juice and grapefruit soda. Citrus, slightly bitter, clean and balanced.", "precio": "12€"}
      ]
    }
  ],
  ca: [
    {
      "categoria": "Aperitius",
      "platos": [
        {"nombre": "Cachonditas", "desc": "Oliva gordal clàssica amb ceba i pebrot picant", "precio": "4€"},
        {"nombre": "Pampa", "desc": "Oliva gordal al ximixurri argentí", "precio": "4.50€"},
        {"nombre": "Ibèriques", "desc": "Oliva gordal amb gust a pernil de Jabugo", "precio": "5€"},
        {"nombre": "Piemont", "desc": "Oliva gordal amanida amb tòfona blanca", "precio": "5€"},
        {"nombre": "Gilda Clàssica amb Anxova del Cantàbric", "desc": "", "precio": "3€"},
        {"nombre": "Gilda de Seitó en Vinagre", "desc": "", "precio": "3€"},
        {"nombre": "Gilda Matrimoni", "desc": "Amb anxova i seitó", "precio": "3€"},
        {"nombre": "Gilda de Tòfona i Formatge Curat", "desc": "Amb tomàquet sec", "precio": "3.50€"}
      ]
    },
    {
      "categoria": "Tapes",
      "platos": [
        {"nombre": "Mandonguilles a la Catalana", "desc": "Salsa de tomàquet casolana", "precio": "12.90€"},
        {"nombre": "Canelons de Bolets", "desc": "Amb beixamel de tòfona", "precio": "15€"},
        {"nombre": "Carxofes de Tudela Confitades", "desc": "Pernil ibèric i rovell", "precio": "19€"},
        {"nombre": "Galta de Porc Guisada al Vi Negre", "desc": "Amb puré cremós", "precio": "17.90€"},
        {"nombre": "Pa de Coca amb Tomàquet i OOVE", "desc": "", "precio": "4.50€"},
        {"nombre": "Patates Braves de la Casa", "desc": "All i oli cítric i salsa xipotle", "precio": "8€"},
        {"nombre": "Moniato Fregit amb Mel de Tòfona i Flor de Sal", "desc": "", "precio": "10.90€"},
        {"nombre": "Amanida Russa", "desc": "Ventresca i ou", "precio": "10€"},
        {"nombre": "Coca Artesana", "desc": "Ricotta, pesto i pernil salat", "precio": "13€"},
        {"nombre": "Xoriçets Asturians a la Sidra", "desc": "", "precio": "11€"},
        {"nombre": "Mandonguilles d'Espinacs i Mozzarella", "desc": "Ragú de tomàquet", "precio": "12.90€"},
        {"nombre": "Tires de Pollastre Arrebossades", "desc": "Salsa mel i mostassa", "precio": "13.90€"},
        {"nombre": "Aletes de Pollastre Confitades", "desc": "Maionesa de tximitxurri", "precio": "13.90€"},
        {"nombre": "Carpaccio de Vedella", "desc": "Parmesà i OOVE", "precio": "13.90€"},
        {"nombre": "Taula de Pernil Ibèric Tallat a Ganivet", "desc": "", "precio": "25€"}
      ]
    },
    {
      "categoria": "Les Nostres Truites",
      "platos": [
        {"nombre": "Clàssica", "desc": "", "precio": "6.90€"},
        {"nombre": "Sobrassada i Brie", "desc": "", "precio": "7.90€"},
        {"nombre": "Pebrot Verd i Botifarra", "desc": "", "precio": "7.90€"},
        {"nombre": "Bolets", "desc": "", "precio": "7.90€"},
        {"nombre": "Pernil Ibèric i Tòfona Negra", "desc": "", "precio": "8.90€"},
        {"nombre": "Especial del Dia", "desc": "Pregunteu-nos", "precio": "—"}
      ]
    },
    {
      "categoria": "Croquetes Artesanals",
      "platos": [
        {"nombre": "Pernil Ibèric", "desc": "", "precio": "8€"},
        {"nombre": "Bacallà", "desc": "", "precio": "8€"},
        {"nombre": "Pollastre", "desc": "", "precio": "8€"},
        {"nombre": "Cua de Bou", "desc": "", "precio": "9€"},
        {"nombre": "Calamarsó en la seva Tinta", "desc": "", "precio": "9€"}
      ]
    },
    {
      "categoria": "Llaunes",
      "platos": [
        {"nombre": "Sardines Picants", "desc": "", "precio": "8.50€"},
        {"nombre": "Sardines en OOVE", "desc": "", "precio": "8.50€"},
        {"nombre": "Musclos en Escabetx Premium", "desc": "", "precio": "8.50€"},
        {"nombre": "Cloïsses al Natural", "desc": "", "precio": "10.50€"},
        {"nombre": "Pop en Oli d'Oliva o Salsa Gallega", "desc": "", "precio": "10.50€"},
        {"nombre": "Escopinyes al Natural", "desc": "", "precio": "12.50€"}
      ]
    },
    {
      "categoria": "Postres",
      "platos": [
        {"nombre": "Coulant de Xocolata", "desc": "", "precio": "5€"},
        {"nombre": "Brownie de Xocolata", "desc": "", "precio": "5€"},
        {"nombre": "Coulant de Formatge Manxec", "desc": "", "precio": "6€"},
        {"nombre": "Pastís de Formatge Manxec", "desc": "", "precio": "6€"},
        {"nombre": "Pastís Sacher", "desc": "", "precio": "7€"}
      ]
    },
    {
      "categoria": "Cocktails",
      "platos": [
        {"nombre": "Melon Breeze", "desc": "Dolç · Fresc · Picant — Vodka premium amb la suavitat del meló i la intensitat exòtica de la fruita de la passió", "precio": "11€"},
        {"nombre": "Red Sky", "desc": "Cremós · Floral · Sofisticat — Ginebra aromàtica amb fruits del bosc, essència de roses i un toc cítric refrescant", "precio": "12€"},
        {"nombre": "Peach Breeze", "desc": "Fumat · Afruitat · Seductor — Whisky escocès amb préssec madur que crea una base intensa i sucosa amb vainilla càlida", "precio": "12€"},
        {"nombre": "Mimosa", "desc": "Suc de taronja natural combinat amb vi escumós, fresc i fàcil de beure.", "precio": "4€"},
        {"nombre": "Mojito", "desc": "Rom blanc, llima, menta fresca, sucre i soda. Equilibrat i molt bevible.", "precio": "9€"},
        {"nombre": "Sex on the Beach", "desc": "Vodka, licor de préssec, suc de taronja i nabius. Suau i desenfadat.", "precio": "10€"},
        {"nombre": "Espresso Martini", "desc": "Vodka, cafè exprés acabat de fer i licor de cafè. Cremós i amb caràcter.", "precio": "10€"},
        {"nombre": "Paloma", "desc": "Tequila Patrón, suc de llima i refresc d'aranja. Cítric, lleugerament amarg, net i equilibrat.", "precio": "12€"}
      ]
    }
  ]
};
