import type { TvSliderProps } from "../types";

function TvSlider(props: TvSliderProps) {
  return (
    <div>
      <h1 className="white">{props.category}</h1>
    </div>
  )
}

export default TvSlider