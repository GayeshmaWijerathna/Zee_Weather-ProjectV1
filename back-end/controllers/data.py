from fastapi import APIRouter, HTTPException
from utility.data import LoadDataTable
import os

router = APIRouter()

# Load the data table
data_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "../data/data.csv")
data = LoadDataTable(data_path)


@router.get("/suburb/{suburb}")
async def get_suburb(suburb: str):
    result = data[data["Suburb"].str.lower() == suburb.lower()].to_dict(orient="records")
    if not result:
        raise HTTPException(status_code=404, detail=f"Suburb '{suburb}' not found.")
    return result
