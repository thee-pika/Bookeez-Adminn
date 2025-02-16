"use client"
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface Template {
  template_name: string,
  _id: string,
  defaultValues: {
    title: string,
    author: string,
    price: number,
    isbn: string,
    subject: string,
    stream: string,
    description: string,
    semester: string,
    condition: string,
    imageUrl: string,
  }
}

const GetSearchResults = () => {
  const { query } = useParams();
  const [searchedTemplates, setsearchedTemplates] = useState<Template[]>([]);

  useEffect(() => {

    const fetchTemplate = async () => {

      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URI}/api/template`);

      const data = await res.json();
      const templateData = data.template;

      if (!query) {
        return <h1>  No query found!! </h1>
      }

      if (!templateData) {
        return <h1> Templates not found!! </h1>
      }

      const queryiedTemplates = templateData.filter((template: Template) => {
        template.template_name.toLowerCase().includes(query as string)
      })

      if (queryiedTemplates.length > 0) {
        setsearchedTemplates(queryiedTemplates);
      }

    }

    fetchTemplate();
  }, [])

  return (
    <>

      <div className="templates grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 p-4  ">
        {
          searchedTemplates ?
            searchedTemplates.map((template: Template, index) => (
              <Link href={`/template/${template._id}`} key={template._id}>
                <div key={index} className=" flex flex-col justify-evenly rounded-md  w-[340px] h-[70vh] items-center bg-white shadow-[#ffffff] shadow-md hover:shadow-xl transition-shadow">
                  <p className="mt-4 font-bold text-lg overflow-hidden text-ellipsis whitespace-nowrap">{template.template_name}</p>
                  <div className="w-[190px] h-[250px] overflow-hidden">
                    <Image
                      src={template.defaultValues.imageUrl}
                      alt={template.template_name}
                      priority
                      width={190}
                      height={250}
                      className="rounded-t-lg transition-all duration-300 object-cover w-[190px] h-[250px]"
                    />
                  </div>
                  <h1 className="font-semibold text-lg overflow-hidden text-ellipsis whitespace-nowrap w-full px-2 text-center">{template.defaultValues.title}</h1>
                  <p className="truncate">
                    <span className="font-bold">Author:</span>
                    <span className="hover:underline"> {template.defaultValues.author}</span>
                  </p>
                  <p className="truncate">
                    <span className="font-bold">Stream:</span>
                    <span className="hover:underline"> {template.defaultValues.stream}</span>
                  </p>
                  <p className="truncate">
                    <span className="font-bold">Subject:</span>
                    <span className="hover:underline"> {template.defaultValues.subject}</span>
                  </p>
                </div>
              </Link>
            )
            )
            : <h1 className="bg-red-800 text-gray-300">No query found!!</h1>
        }
      </div>

    </>
  )
}

export default GetSearchResults;