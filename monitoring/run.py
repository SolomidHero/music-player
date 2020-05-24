import os
import logging
import time
import unicodedata
import graphyte


from selenium import webdriver
from bs4 import BeautifulSoup

logging.getLogger().setLevel(logging.INFO)

BASE_URL = 'https://yandex.ru/'

CURRENCIES = {
    'USD': 'usd',
    'EUR': 'euro',
    'USD MOEX': 'usd',
    'EUR MOEX': 'euro',
    'Нефть': 'oil'
}

def parse_yandex_page(page):
    currency_blocks = page.findAll('div', {'class': 'inline-stocks__item'})

    currencies = []
    for block in currency_blocks:
        currency_utf8 = block.find('a', {'class': 'home-link'}).text
        currency = unicodedata.normalize("NFKD", currency_utf8)
        value = float(block.find('span', {
            'class': 'inline-stocks__value_inner'
        }).text.replace(',', '.'))

        currencies.append((CURRENCIES[currency], value))
    return currencies


GRAPHITE_HOST = 'graphite'

def send_metrics(currencies):
    sender = graphyte.Sender(GRAPHITE_HOST, prefix='currencies')
    for currency in currencies:
        sender.send(currency[0], currency[1])

def main():

    driver = webdriver.Remote(
        command_executor='http://selenium:4444/wd/hub',
        desired_capabilities={'browserName': 'chrome', 'javascriptEnabled': True}
    )

    driver.get('https://yandex.ru')
    time.sleep(5)
    html = driver.page_source
    soup = BeautifulSoup(html, 'html.parser')

    metric = parse_yandex_page(soup)
    send_metrics(metric)

    driver.quit()

    logging.info('Accessed %s ..', BASE_URL)
    logging.info('Page title: %s', driver.title)

if __name__ == '__main__':
    main()
