import { VideoUploader } from "@/components";

const Upload = (): JSX.Element => {
  return (
    <>
      <div className="container">
        <h1 className="text-2xl font-black tracking-tighter lg:text-4xl lg:leading-none text-center mt-12">
          Credits: #
        </h1>
        <VideoUploader />
        <div className="w-full flex justify-center">
          <button className="btn btn-primary mb-12 w-28">Submit</button>
        </div>
      </div>
    </>
  );
};

export default Upload;
