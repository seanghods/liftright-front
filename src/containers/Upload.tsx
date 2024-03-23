import { VideoUploader } from "@/components";

const Upload = (): JSX.Element => {
  return (
    <>
      <div className="container">
        <h1 className="text-2xl font-black tracking-tighter lg:text-4xl lg:leading-none text-center mt-12">
          Credits: #
        </h1>
        <VideoUploader />
      </div>
    </>
  );
};

export default Upload;
