setup-python:
	poetry install

setup-node:
	cd streamlit_carousel_slider/frontend && pnpm install --frozen-lockfile

setup: setup-python setup-node

build-frontend:
	cd streamlit_carousel_slider/frontend && pnpm run build

build: build-frontend
	poetry run python setup.py sdist bdist_wheel

upload: build
	poetry run twine upload dist/*
