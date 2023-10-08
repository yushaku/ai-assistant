import langchain_helper  as lch
import streamlit as st

st.title("Pets name generator")

animal_type = st.sidebar.selectbox(
    "what is your pet?",
    ("dog", "cat", "hamster","cow")
)

pet_color = st.sidebar.text_area(
    "what is your pet color?"
)

if pet_color: 
    response = lch.generate_pet_name(animal_type, pet_color)
    st.text(response['pet_name'])
