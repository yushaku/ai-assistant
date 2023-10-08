import os
import pinecone
from langchain.vectorstores import Pinecone

from dotenv import load_dotenv
from langchain.embeddings import OpenAIEmbeddings
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.prompts import PromptTemplate
from langchain.chains import SimpleSequentialChain
from langchain.chat_models import ChatOpenAI
from langchain.schema import HumanMessage, SystemMessage

from langchain.agents.agent_toolkits import create_python_agent
from langchain.tools.python.tool import PythonREPLTool
from langchain.python import PythonREPL
from langchain.llms.openai import OpenAI
from langchain.chains import LLMChain

load_dotenv()

def helper():
    llm = ChatOpenAI(temperature=0.5)
    messages = [
        SystemMessage(content="You are an expert data scientist"),
        HumanMessage(content="Write a Python script that trains a neural network on simulated data") 
    ]
    # response=llm(messages)
    # print(response.content,end='\n')

    template = """
    You are an expert data scientist with an expertise in building deep learning models. 
    Explain the concept of {concept} in a couple of lines
    """

    prompt = PromptTemplate(input_variables=["concept"], template=template)

    # Run LLM with PromptTemplate
    chain = LLMChain(llm=llm, prompt=prompt)
    # Run the chain only specifying the input variable.
    # print(chain.run("autoencoder"))

    second_prompt = PromptTemplate(
        input_variables=["ml_concept"],
        template="Turn the concept description of {ml_concept} and explain it to me like I'm five in 500 words",
    )
    chain_two = LLMChain(llm=llm, prompt=second_prompt)

    # Define a sequential chain using the two chains above:
    # the second chain takes the output of the first chain as input
    overall_chain = SimpleSequentialChain(chains=[chain, chain_two], verbose=True)

    # Run the chain specifying only the input variable for the first chain.
    explanation = overall_chain.run("autoencoder")
    print(explanation)

    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size = 100,
        chunk_overlap  = 0,
    )

    texts = text_splitter.create_documents([explanation])
    embeddings = OpenAIEmbeddings(model="ada")

    # Turn the first text chunk into a vector with the embedding
    query_result = embeddings.embed_query(texts[0].page_content)
    print(query_result)

    pinecone_upload(texts, embeddings)

    agent_executor = create_python_agent(
        llm=OpenAI(temperature=0, max_tokens=1000),
        tool=PythonREPLTool(),
        verbose=True
    )
    # Execute the Python agent
    agent_executor.run("Find the roots (zeros) if the quadratic function 3 * x**2 + 2*x -1")

def pinecone_upload(texts, embeddings):
    pinecone.init(
        api_key=os.getenv('PINECONE_API_KEY'),  
        environment=os.getenv('PINECONE_ENV')  
    )

    # Upload vectors to Pinecone
    index_name = "langchain-quickstart"
    search = Pinecone.from_documents(texts, embeddings, index_name=index_name)

    # Do a simple vector similarity search
    query = "What is magical about an autoencoder?"
    result = search.similarity_search(query)
    print(result)

if __name__ == "__main__":
    helper()
