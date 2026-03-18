const axios = require('axios');

const getLanguageById = (lang)=>{
    const language = {
        "c++":54,
        "java":62,
        "javascript":63
    }
    return language[lang.toLowerCase()];
}

const waiting = async(timer)=>{
  setTimeout(()=>{
    return 1;
  },timer);
}

const submitBatch = async (submissions) => {
  if (!submissions || submissions.length === 0) {
    throw new Error("No submissions passed to Judge0");
  }

  const options = {
    method: "POST",
    url: "https://judge0-ce.p.rapidapi.com/submissions/batch",
    params: {
      base64_encoded: "false",
      wait: "false",
      fields: "*"                 
    },
    headers: {
      "x-rapidapi-key": "4aec9257a1mshec6d937e081df2cp1201edjsn1540f84af2b2",
      "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
      "Content-Type": "application/json"
    },
    data: {
      submissions: submissions   
    }
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error("Judge0 Error:", error.response?.data || error);
    throw error;
  }
};


const submitToken = async (resultToken)=>{

const options = {
  method: 'GET',
  url: 'https://judge0-ce.p.rapidapi.com/submissions/batch',
  params: {
    tokens: resultToken.join(","),
    base64_encoded: 'false',
    fields: '*'
  },
  headers: {
    'x-rapidapi-key': '4aec9257a1mshec6d937e081df2cp1201edjsn1540f84af2b2',
    'x-rapidapi-host': 'judge0-ce.p.rapidapi.com'
  }
};

async function fetchData() {
	try {
		const response = await axios.request(options);
		return response.data;
	} catch (error) {
		console.error(error);
	}
}

 while(true){
 const result =  await fetchData();
  const IsResultObtained =  result.submissions.every((r)=>r.status_id>2);

  if(IsResultObtained)
    return result.submissions;
  await waiting(1000);
}

}

module.exports = {getLanguageById,submitBatch,submitToken};
