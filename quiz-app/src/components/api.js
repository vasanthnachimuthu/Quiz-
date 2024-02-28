import axios from 'axios';

const fetchQuestions = () => {
    return axios.get('http://localhost:3000/api/questions')
        .then(response => {
            return response.data.map(q => {
                return {
                    ...q,
                    options: JSON.parse(q.options)
                };
            });
        })
        .catch(error => {
            console.error('Error fetching questions:', error);
            return [];
        });
};

export default fetchQuestions;
