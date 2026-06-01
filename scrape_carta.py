import requests
from bs4 import BeautifulSoup
import json

response = requests.get("https://gorgeous-macaron-ea6c19.netlify.app/carta-esp")
soup = BeautifulSoup(response.text, 'html.parser')

mi_carta = []

# Scrape Food (Carta)
food_section = soup.find(id='carta')
if food_section:
    categories = food_section.find_all(class_='cat-block')
    for cat in categories:
        cat_title_el = cat.find(class_='cat-banner-title')
        if not cat_title_el: continue
        cat_title = cat_title_el.text.strip()
        
        platos = []
        items = cat.find_all(class_='item')
        for item in items:
            name_el = item.find(class_='item-name')
            desc_el = item.find(class_='item-desc')
            price_el = item.find(class_='item-price')
            
            if name_el and price_el:
                platos.append({
                    "nombre": name_el.text.strip(),
                    "desc": desc_el.text.strip() if desc_el else "",
                    "precio": price_el.text.strip()
                })
        
        if platos:
            mi_carta.append({
                "categoria": cat_title,
                "platos": platos
            })

# Scrape Drinks (Bebidas) -> Only Spritz and Cocktails
drinks_section = soup.find(id='bebidas')
if drinks_section:
    categories = drinks_section.find_all(class_='cat-block')
    for cat in categories:
        cat_title_el = cat.find(class_='cat-banner-title')
        if not cat_title_el: continue
        cat_title = cat_title_el.text.strip()
        
        if cat_title.lower() in ['spritz', 'cocktails']:
            platos = []
            
            items = cat.find_all(class_='item')
            for item in items:
                name_el = item.find(class_='item-name')
                desc_el = item.find(class_='item-desc')
                price_el = item.find(class_='item-price')
                if name_el and price_el:
                    platos.append({
                        "nombre": name_el.text.strip(),
                        "desc": desc_el.text.strip() if desc_el else "",
                        "precio": price_el.text.strip()
                    })
            
            if platos:
                mi_carta.append({
                    "categoria": cat_title,
                    "platos": platos
                })
            
            if platos:
                mi_carta.append({
                    "categoria": cat_title,
                    "platos": platos
                })

js_output = "const MI_CARTA = " + json.dumps(mi_carta, indent=2, ensure_ascii=False) + ";\n"
with open('carta.js', 'w', encoding='utf-8') as f:
    f.write(js_output)
print("Scraping successful. carta.js has been updated.")
