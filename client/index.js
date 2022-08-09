// document.querySelector('.current-directory').innerText = __dirname;
//get / set dirname...

axios.get('/dir')
.then(res => document.querySelector('.current-directory').innerText = 'Directory: ' + res.data);

const getData = () => {
  axios({
    method: 'get',
    url: '/scripts'
  })
  .then((res) => {
    Object.keys(res.data).forEach(scriptName => {
      let el = document.createElement('div');
      el.innerText = scriptName;
      el.addEventListener('click', () => {
        axios({
          method: 'post',
          url: '/run',
          data: {
            scriptName: scriptName
          }
        });
      });
      
      document.querySelector('.existing-scripts-list').appendChild(el);
    });
  })
  .catch(err => err);
};


getData();