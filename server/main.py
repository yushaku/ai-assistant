from langchain.llms import OpenAI
from dotenv import load_dotenv

load_dotenv()

def generate_pet_name():
    llm = OpenAI(temperature=0.7)
    name = llm("suggest me five cool name for my dog")
    return name

if __name__ == "__main__":
    print(generate_pet_name())
