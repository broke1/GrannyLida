
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
  {
    id: 7,
    src: pathImg(7),
  },
  {
    id: 8,
    src: pathImg(8),
  },
  {
    id: 9,
    src: pathImg(9),
    columns: 2
  },
  {
    id: 10,
    src: pathImg(10),
    columns: 2
  },
  {
    id: 11,
    src: pathImg(11),
    rows: 2
  },
  {
    id: 12,
    src: pathImg(12)
  },
  {
    id: 13,
    src: pathImg(13),
  },
  {
    id: 14,
    src: pathImg(14)
  },
  {
    id: 15,
    src: pathImg(15),
  },
]
