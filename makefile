install:
	npm ci

serve:
	npx webpack serve

dev:
	npx webpack

build:
	NODE_ENV=production npx webpack

lint:
	npx eslint .

.PHONY: test