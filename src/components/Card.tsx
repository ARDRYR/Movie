interface CardProps {
  imageSource: string;
  title: string;
  score: number;
}

export default function Card({ imageSource, title, score }: CardProps) {

  return(
    <div className="card">
      <img className="card-image" src={imageSource}/>
      <div className="card-infomation">
        <span className="card-title">{title}</span>
        <span className="card-score">⭐ {score.toFixed(1)}</span>
      </div>
    </div>
  );
}


