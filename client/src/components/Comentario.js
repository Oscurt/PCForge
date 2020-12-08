import React from 'react';

export default function Comentario(props) {
  const { comment } = props;
  return (
    <div key={comment.id_prod} className="card">
      <div className="card-body">
        <a href={`/profile/${comment.usuario}`}>
          <h2>{comment.usuario}</h2>
        </a>
        <div className="price">{comment.contenido}</div>
        <h2><span className="fa fa-star-o"></span>{comment.calificacion+" Publicado el: "+comment.fecha}</h2>
      </div>
    </div>
  );
}