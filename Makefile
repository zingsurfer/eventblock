GREEN  := $(shell tput -Txterm setaf 2)
CYAN   := $(shell tput -Txterm setaf 6)
RESET_COLOR  := $(shell tput -Txterm sgr0)

welcome: # List available commands.
	@echo ''
	@echo '            Welcome to'
	@echo ' _____   _____   _____   _____   _____'
	@echo '|  E  | |  V  | |  E  | |  N  | |  T  |'
	@echo '|__B__| |__L__| |__O__| |__C__| |__K__|'
	@echo ''
	@echo 'Available commands include:'
	@awk 'BEGIN {FS = ":.*?# "} { \
		if (/^[a-zA-Z_-]+:.*?.*$$/) {printf "${CYAN}# %s${RESET_COLOR}\n${GREEN}make %-20s\n\n", $$2, $$1} \
		}' $(MAKEFILE_LIST)

setup: # Initial setup. Update env vars in truffle/.env with your own values.
	npm install -g truffle ganache yarn
	cd truffle && cp .env.sample .env && yarn install
	cd client && yarn install

install: # Install app dependencies.
	cd truffle && cp .env.sample .env && yarn install
	cd client && yarn install

compile: # Compile contracts.
	cd truffle && truffle compile

test: # Run contract tests.
	cd truffle && truffle test

dev_deploy: # Compile and deploy contracts to localhost.
	cd truffle && truffle migrate --network development

aurora_test_deploy: # Compile and deploy contracts to Aurora testnet.
	cd truffle && truffle migrate --network auroratestnet

opera_test_deploy: # Compile and deploy contracts to Opera testnet.
	cd truffle && truffle migrate --network operatestnet

build_client: # Bundle client assets.
	cd client && yarn run build

start_client: # Launch DApp.
	cd client && yarn start
