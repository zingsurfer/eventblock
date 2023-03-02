welcome:
	echo "Welcome to EventBlock!"

install:
	cd truffle && cp .env.sample .env && yarn install
	cd client && yarn install

compile:
	cd truffle && truffle compile

test:
	cd truffle && truffle test

dev_deploy:
	cd truffle && truffle migrate --network development

test_deploy:
	cd truffle && truffle migrate --network auroratestnet

start_client:
	cd client && yarn start

build_client:
	cd client && yarn run build
