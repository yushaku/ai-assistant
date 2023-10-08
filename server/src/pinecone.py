import openai
import os

MODEL = "text-embedding-ada-002"

openai.api_key='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'
res = openai.Embedding.create(
    input=[
        "Sample document text goes here",
        "there will be several phrases in each batch"
    ], engine=MODEL
)
embeds = [record['embedding'] for record in res['data']]

