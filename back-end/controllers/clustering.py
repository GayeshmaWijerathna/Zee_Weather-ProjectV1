from fastapi import APIRouter, HTTPException
from models.clustering import clusteringPrediction, clusteringInput, Cluster

router = APIRouter()


# @router.post("/predict", response_model=clusteringPrediction)
# async def predict(input: clusteringInput):
#     if Cluster.instance == None:
#         raise HTTPException(status_code=404, detail="regression instance does not exist")
#
#     return Cluster.instance.predict(input)

@router.post("/predict", response_model=clusteringPrediction)
async def predict(input: clusteringInput):
    try:
        if Cluster.instance is None:
            raise HTTPException(status_code=404, detail="Cluster instance does not exist")
        return Cluster.instance.predict(input)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
