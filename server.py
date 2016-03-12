#!/usr/bin/env python
# encoding: utf-8

import web
import urllib
import os, sys
reload(sys)  
sys.setdefaultencoding('utf8')  
from bs4 import BeautifulSoup
import requests
import ConfigParser, json, re
import time

urls = (
    '/acminfo', 'Acminfo',
    '/segmentfault', 'Segmentfault',
)

app = web.application(urls, globals())


def getContent(url):
	s = requests.get(url)
	soup = BeautifulSoup(s.content, 'html.parser')
	return soup

class Acminfo:
	def GET(self):
		url = "http://acmicpc.info/archives/224"
		content = getContent(url)
		content = content.find_all("table", id="wp-table-reloaded-id-1-no-1")
		web.header('content-type','text/json')
		d = json.dumps({'msg':str(content[0])})
		return 'myJsonMethod(' + d + ');'

class Segmentfault:
	def GET(self):
		url = "https://segmentfault.com/events"
		content = getContent(url)
		#content = content.find_all("div", class_="container")
		header = content.find(attrs={'class':'container'})
		header.decompose()
		header = content.find(attrs={'class':'global-nav shadow-bottom'})
		header.decompose()
		footer = content.find(attrs={'id':'footer'})
		footer.decompose()
		web.header('content-type','text/json')
		msg = content.prettify()

		url = 'https://segmentfault.com/events/coming?page=2&category=&city='
		content = getContent(url)
		#content = content.find_all("div", class_="container")
		header = content.find(attrs={'class':'container'})
		header.decompose()
		header = content.find(attrs={'class':'global-nav shadow-bottom'})
		header.decompose()
		footer = content.find(attrs={'id':'footer'})
		footer.decompose()

		msg += content.prettify()
		d = json.dumps({'msg':str(msg)})
		return 'myJsonMethod(' + d + ');'


if __name__ == '__main__':
	app.run()

