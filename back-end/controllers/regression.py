from fastapi import APIRouter, HTTPException

from models.regression import regressionPrediction, regressionInput, regression

router = APIRouter()


# @router.post("/predict", response_model=regressionPrediction)
# async def predict(input: regressionInput):
#     if regression.instance == None:
#         raise HTTPException(status_code=404, detail="regression instance does not exist")
#
#     print(regression.instance.predict(input))
#
#     return regression.instance.predict(input)

@router.post("/predict", response_model=regressionPrediction)
async def predict(input: regressionInput):
    try:
        if regression.instance is None:
            raise HTTPException(status_code=404, detail="Cluster instance does not exist")
        return regression.instance.predict(input)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
