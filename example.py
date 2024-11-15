from streamlit_carousel_slider import Image, streamlit_carousel_slider

test_images = [
    Image(
        sourse="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhPbO0Hwiy3nXmTGo-Eo66iqRnhgjLXB2sD7huKl5pjltjVNddTEmPdETiYbFRAvUL80XPE8_2SDJeW-EP8kgLfVBjTMb_GIDVWn3V4Cq3O5fLacfWRam-72uD9oRGzlPJccNQN0e89PH7aMm5lcDuejTHw4HZWV7uB9aU-K0X6e9wxsGwRmE0K_TI0rpwQ/s1000/shinnen_aisatsu_hebi_medousa_couple.png"
    )
]


streamlit_carousel_slider(images=test_images)
