import { settingResponse } from "./settingResponse.js";


const handledServiceResult = (res, result, successStatus = 200) => {
    if (result instanceof Error) {
        return settingResponse(res, result);
    }


    if (!result.success) {
        return res.status(result.status || 500).json(result);
    }

    return res.status(result.status || successStatus).json(result);
};

//export 
export {
    handledServiceResult
};