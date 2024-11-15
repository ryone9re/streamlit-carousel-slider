import os
from typing import TypedDict
import streamlit.components.v1 as components

_RELEASE = False

_COMPONENT_NAME = "streamlit_carousel_slider"

if not _RELEASE:
    _component_func = components.declare_component(
        _COMPONENT_NAME,
        url="http://localhost:3000",
    )
else:
    parent_dir = os.path.dirname(os.path.abspath(__file__))
    build_dir = os.path.join(parent_dir, "frontend/dist")
    _component_func = components.declare_component(
        _COMPONENT_NAME,
        path=build_dir
    )


class Image(TypedDict):
    """
    An image to be displayed in carousel.
    """
    sourse: str
    """Image sourse string"""


def streamlit_carousel_slider(images: list[Image]) -> None:
    """
    Carousel slider component entrypoint for streamlit using React and tailwind with daisyui.

    :param list[Image] images: A list of images to be displayed in the carousel.
    :return: Nothing to be returned.
    :rtype: None
    """
    return _component_func(images, key="carousel")
