/* eslint-disable @typescript-eslint/prefer-optional-chain */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, Fragment } from "react";
import SquareLoader from "react-spinners/SquareLoader";

export default function ClothingResults({ items }: any) {
  const [imgload, setImgload] = useState<boolean>(false)
  const [query, setQuery] = useState<string>("")
  const [list, setList] = useState<any>(items)
  const [sort, setSort] = useState<string>("rel")
  const rating = (stars: number) => {
    return Math.round(stars)
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const newList = items.filter((item: any) => item.title.toLowerCase().includes(query.toLowerCase()) || item.brand.toLowerCase().includes(query.toLowerCase()))
    setList(newList)
  }, [query])

  useEffect(() => {
    if (sort === "rel") {
      setList(items)
    } else if (sort === "asc") {
      const newList = [...items].sort((a: any, b: any) => {
        let first = a.price.replace("$", "")
        let second = b.price.replace("$", "")
        return parseFloat(first) - parseFloat(second)
      })
      setList(newList)
    } else if (sort === "desc") {
      const newList = [...items].sort((a: any, b: any) => {
        let first = a.price.replace("$", "")
        let second = b.price.replace("$", "")
        return parseFloat(second) - parseFloat(first)
      })
      setList(newList)
    } else if (sort === "rating") {
      const newList = [...items].sort((a: any, b: any) => {
        return b.rating - a.rating
      })
      setList(newList)
    } else if (sort === "lowest") {
      const newList = [...items].sort((a: any, b: any) => {
        return a.rating - b.rating
      })
      setList(newList)
    }
  }, [sort])

  return (
    <>
      <div className="flex flex-col items-center">
        <ul className="steps sticky z-[90] top-10 items-center">
          <li className="step step-primary">Inital Survey</li>
          <li className="step step-primary">Body Measurements</li>
          <li className="step step-primary">Clothing Selection</li>
          <li className="step step-primary">Final Selection</li>
        </ul>
        <div className="mt-10 flex flex-col items-center w-screen max-w-full">
          <h1 className="m-5 font-normal text-6xl">Your Styles!</h1>
          <input type="text" value={query} placeholder="Search" className="input input-bordered input-primary w-[80%]" onChange={(e) => {
            setQuery(e.target.value)
          }} />
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Sort by</span>
            </label>
            <select className="select select-bordered" onChange={(e) => {
              e.preventDefault()
              setSort(e.target.value)
            }}>
              <option value="rel">Relevance</option>
              <option value="asc">Price Ascending</option>
              <option value="desc">Price Descending</option>
              <option value="rating">Highest-Lowest Rating</option>
              <option value="lowest">Lowest-Highest Rating</option>
            </select>
          </div>
          <div className="flex flex-wrap justify-center">
            {
              list &&
              list.map((item: any, index: number) => {
                let stars = rating(item.rating)
                let displayRating = []
                if (stars === 0) {
                  displayRating.push("No rating")
                } else {
                  for (let i = 0; i < stars; i++) {
                    displayRating.push(<input disabled type="radio" name="rating-5" className="bg-green-500 mask mask-star-2" />)
                  }
                }

                return (
                  <div key={index} className="card w-96 bg-base-100 shadow-xl m-5 hover:opacity-50"
                    onClick={() => {
                      window.open(item.url, "_blank")
                    }}
                  >
                    <figure>
                      <SquareLoader
                        color={`hsl(var(--p))`}
                        loading={!imgload}
                        size={50}
                      />
                      <img src={item.imageUrl} className={imgload ? "" : "hidden"} onLoad={() => {
                        setImgload(true)
                      }} alt="Shoes" />
                    </figure>
                    <div className="card-body">
                      <h1 className="card-title">{item.title}</h1>
                      <h2>{item.price}</h2>
                      <div className="rating rating-lg rating-half">
                        {displayRating.map((element, index) =>
                          <Fragment key={index}>
                            {element}
                          </Fragment>
                        )}
                      </div>
                      <p>{item.brand}</p>
                      <div className="flex flex-row flex-wrap">
                        {
                          item.attributes &&
                          item.attributes.map((item: any, index: number) =>
                            <div key={index} className="badge badge-primary mr-1 mb-1">{item}</div>
                          )
                        }
                      </div>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    </>
  )
}
