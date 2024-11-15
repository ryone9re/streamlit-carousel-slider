setup-python:
	poetry install --sync

setup-node:
	cd streamlit_carousel_slider/frontend && pnpm install --frozen-lockfile

setup: setup-python setup-node
