import React from 'react';
import "./news.css";

const News = (props) => {
  console.log("this props data: ", props.data);
  
  const { title, url, showIntroText, dates, description } = props.data;
  console.log("title: ", props.data.title);
  console.log("showIntroText: ", showIntroText);

  return (
    <div className="messages__item messages__item--visitor">
      <div>
        <a className="news-link" target='_blank' href={url}>{title}</a>
        <div className="news-date">{dates}</div>
        <p>{description}
          {/* <a href={url} className="read-more-link">
            <button className="read-more-button">Read More</button> </a>  */}
            </p>
        {/* <span>
      <button className="read-more-button">Read More</button>
    </span> */}
      </div>
    </div>


  );
};

export default News;


// import React from 'react';

// const News = (props) => {
//   const { title, url, showIntroText } = props;

//   return (
//     <div className="messages__item messages__item--visitor">
//       {showIntroText && (
//         <div>
//           <p>Here is some of latest News about Jimma University</p>
//         </div>
//       )}
//       <div>
//         <a href={url}>{title}</a>
//       </div>
//     </div>
//   );
// };

// export default News;
