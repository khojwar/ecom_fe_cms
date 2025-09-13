import TextComponents from "./components/TextComponents"



function App() {

  return (
    <div className="flex flex-col justify-center items-center max-w-5xl mx-auto">
      <TextComponents
        text="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis ut sint adipisci possimus, similique culpa maiores enim minus explicabo tenetur consectetur, ab id quo labore eius, repellat deleniti sequi velit!
Officia aut, officiis est consectetur ipsum, accusantium odio et architecto deleniti quas temporibus corporis iusto dolores nulla aliquid fuga facere porro maiores, nesciunt totam voluptates cupiditate voluptate hic. Quam, ad.
Quibusdam voluptatibus laboriosam facere fugit modi, quisquam ab totam perspiciatis consequuntur non veritatis soluta magni aut, odit ad illum rerum. Molestias qui odit ducimus doloribus id, quod pariatur ab dolorem.
Veritatis, hic consequatur ipsam vero itaque voluptates quod? Similique consequatur aliquam perferendis commodi blanditiis explicabo culpa exercitationem itaque, ut error officiis facere voluptatum quae porro recusandae magni, doloribus dolorem esse.
Delectus eius odit unde reiciendis fugiat temporibus ex eum sit magni, veniam voluptatem, beatae cumque dolorem cupiditate blanditiis sed fugit commodi quisquam. Quos quis tempore molestiae, molestias incidunt itaque dolor?"
      
      className="bg-gray-200 rounded-lg shadow-md my-4 w-full"
      />

      <TextComponents 
      text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam doloremque cumque a cum tempore, esse doloribus totam assumenda, non ad perspiciatis officia sequi quasi. Repellendus inventore ex suscipit aperiam odit.
      Possimus dolor at nulla ad id quo, exercitationem velit. Repellendus molestiae minima recusandae soluta officia dolore sequi voluptatem ipsa nulla possimus quod reiciendis suscipit, cupiditate sit unde quam eius amet." 
     
      className="bg-blue-200 rounded-lg shadow-md my-4 w-full"
     />


      <TextComponents 
      text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam doloremque cumque a cum tempore, esse doloribus totam assumenda, non ad perspiciatis officia sequi quasi. Repellendus inventore ex suscipit aperiam odit.
      Possimus dolor at nulla ad id quo, exercitationem velit. Repellendus molestiae minima recusandae soluta officia dolore sequi voluptatem ipsa nulla possimus quod reiciendis suscipit, cupiditate sit unde quam eius amet." 
      
      className="bg-green-200 rounded-lg shadow-md my-4 w-full"
      />
    </div>
  );
}

export default App
