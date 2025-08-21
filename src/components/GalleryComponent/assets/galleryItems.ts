
const pathImg = (index: number) => {
  return `${ import.meta.env.VITE_BASEPATH}/gallery-img-${index}.jpg`
}

export const galleryItems = [
  {
    id: 0,
    src: pathImg(0),
    rows: 2,
  },
  {
    id: 1,
    src: pathImg(1),
    columns: 2
  },
  {
    id: 2,
    src: pathImg(2)
  },
  {
    id: 3,
    src: pathImg(3),
    rows: 2,
  },
  {
    id: 4,
    src: pathImg(4),
  },
  {
    id: 5,
    src: pathImg(5),
  },
  {
    id: 6,
    src: pathImg(6),
    rows: 2
  },
  // {
  //   id: 4,
  //   src: pathImg(4),
  //   width: 800,
  //   height: 600,
  //   aspectRatio: 800 / 600,
  //   columns: 1,
  // },
  // {
  //   id: 4,
  //   src: pathImg(4),
  //   width: 800,
  //   height: 600,
  //   aspectRatio: 800 / 600,
  //   columns: 1,
  // },
  // {
  //   id: 5,
  //   src: pathImg(4),
  //   width: 800,
  //   height: 600,
  //   aspectRatio: 800 / 600
  // },
  // {
  //   id: 6,
  //   src: pathImg(5),
  //   width: 800,
  //   height: 600,
  //   aspectRatio: 800 / 600
  // },
  // {
  //   id: 7,
  //   src: pathImg(6),
  //   width: 400,
  //   height: 600,
  //   aspectRatio: 400 / 600
  // },
]
