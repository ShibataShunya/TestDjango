import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');
  const [msgs, setMsgs] = useState([]);
  const [user, setUser] = useState('normal');
  const [pnum, setPnum] = useState(1);
  const [plast, setPlast] = useState(1);

  const getMsgs = (num) => {
    getPlast();
    setPnum(num);
    fetch('http://localhost:8000/api/msgs/' + num)
      .then(resp => {
        if (!resp.ok) {
          throw new Error('Network response was not ok');
        }
        return resp.json();
      })
      .then(res => {
        setMsgs(res);
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  };

  const getUser = () => {
    fetch('/api/usr')
      .then(resp => resp.json())
      .then(res => {
        setUser(res.value);
      });
  };

  const getPlast = () => {
    fetch('/api/plast')
      .then(resp => resp.json())
      .then(res => {
        setPlast(res.value);
      });
  };

  const doChange = (event) => {
    setContent(event.target.value);
  };

  const doAction = () => {
    const data = {
      content: content,
    };
    fetch('/api/post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(resp => resp.text())
      .then(res => {
        getPlast();
        getMsgs(1);
        if (res === 'OK') {
          setContent('');
          setMessage('メッセージを投稿しました。');
        }
      });
  };

  const doGood = (event) => {
    fetch('/api/good/' + event.target.id)
      .then(resp => resp.text())
      .then(res => {
        getMsgs(pnum);
        if (res === 'OK') {
          setMessage('GOODしました');
        } else {
          setMessage('既にグッドしています。');
        }
      });
  };

  const onFirst = () => {
    getMsgs(1);
  };

  const onPrev = () => {
    const p = pnum - 1 <= 1 ? 1 : pnum - 1;
    getMsgs(p);
  };

  const onNext = () => {
    const p = pnum + 1 <= 1 ? 1 : pnum + 1;
    getMsgs(p);
  };

  const onLast = () => {
    getMsgs(plast);
  };

  useEffect(() => {
    getUser();
    getMsgs(1);
  }, []);

  return (
    <div className="App">
      <h1 className="display-4 text-primary">
        えすえぬえす
      </h1>
      <p className='fs-3'>
        logined: "{user}".
      </p>
      <div>
        {message !== '' &&
          <div className="alert alert-primary alert-dismissible fade show" role="alert">
            <p>
              {message}
            </p>
            <button type="button" className="btn-close" data-bs-dismiss="alert">
            </button>
          </div>
        }
      </div>
      <div className='content'>
        <textarea className='form-control' onChange={doChange} value={content}>
        </textarea>
        <button className='btn btn-primary' onClick={doAction}>POST!</button>
      </div>
      <hr />
      <table className='table mt-3'>
        <tbody>
          <tr><th>Message</th></tr>
          {msgs.map(obj => (
            <tr key={obj.pk}>
              <td>
                <p className='fs-4 my-0'>{obj.fields.content}</p>
                <p className='my-0 text-end'>
                  <span className='fs-5'>
                    "{obj.fields.owner_name}"
                  </span>
                  <span className='fs-6'>
                    （ {obj.fields.pub_date} ）
                  </span>
                </p>
                <p className='mt-1 fs-6 text-end'>
                  <span className='h6 text-primary'>
                    good = {obj.fields.good_count}
                  </span>
                  <button className='py-0 px-1 btn btn-outline-primary' id={obj.pk} onClick={doGood}>
                    GOOD!
                  </button>
                </p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ul className="pagination justify-content-center">
        <li className="page-item">
          <a className="page-link" href='#' onClick={onFirst}>
            &laquo; さいしょ
          </a>
        </li>
        <li className="page-item">
          <a className="page-link" href='#' onClick={onPrev}>
            &laquo; まえ
          </a>
        </li>
        <li className="page-item">
          <a className="page-link">
            {pnum}/{plast}
          </a>
        </li>
        <li className="page-item">
          <a className="page-link" href='#' onClick={onNext}>
            つぎ &raquo;
          </a>
        </li>
        <li className="page-item">
          <a className="page-link" href='#' onClick={onLast}>
            さいご &raquo;
          </a>
        </li>
      </ul>
    </div>
  );
}

export default App;
