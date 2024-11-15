import os
import streamlit.components.v1 as components

_RELEASE = False

COMPONENT_NAME = "streamlit_carousel_slider"

if not _RELEASE:
    _component_func = components.declare_component(
        COMPONENT_NAME,
        url="http://localhost:3000",
    )
else:
    parent_dir = os.path.dirname(os.path.abspath(__file__))
    build_dir = os.path.join(parent_dir, "frontend/dist")
    _component_func = components.declare_component(
        COMPONENT_NAME,
        path=build_dir
    )


def streamlit_carousel_slider(images):
    _component_func(images)
