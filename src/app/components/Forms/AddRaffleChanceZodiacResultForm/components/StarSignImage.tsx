import {StarSign} from '../../../../constants/star-sign.constants'

interface StarSignImageProps {
  starSignList: StarSign[]
}

function StarSignImage({starSignList}: StarSignImageProps) {
  return (
    <>
      {starSignList.map((star) => {
        return (
          <div>
            <img
              src={`${process.env.REACT_APP_PUBLIC_URL}/zodiac/${star.starSignImage}`}
              alt={star.starSignName}
              height={10}
              style={{marginRight: '7px'}}
            />
            <label>{star.starSignName}</label>
          </div>
        )
      })}
    </>
  )
}

export default StarSignImage
