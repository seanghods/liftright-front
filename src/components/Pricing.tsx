import { Badge, Button, Card } from "react-daisyui";

export const Pricing = () => {
  return (
    <>
      <section className="py-8 lg:py-20" id="pricing">
        <div data-aos="fade-up" className="container">
          <div className="text-center">
            <h2 className="text-4xl font-semibold text-gradient-light">
              Credit Pricing
            </h2>
            <p className="mt-2 text-lg">
              Purchase what you will use. No monthly subscription fees or
              expiring credits.
            </p>
          </div>
          <div className="mt-6 flex justify-center"></div>
          <div className="mt-8 grid gap-8 lg:grid-cols-3">
            <Card className="">
              <Card.Body className="p-3 gap-0">
                <Card className="bg-base-200 lg:h-[275px] xl:h-[225px] mb-6 text-base-content">
                  <Card.Body className="p-6 gap-0">
                    <h3 className="text-xl font-semibold">1 Credit</h3>
                    <p className="mt-2 flex items-baseline">
                      <span className="text-5xl font-bold tracking-tight">
                        $5
                      </span>
                    </p>
                    <p className="mt-4 text-sm">
                      Try out our Weightlifting AI at our lowest price point.
                      See what the hype is about for your own video.
                    </p>
                  </Card.Body>
                </Card>
                <Button
                  variant="outline"
                  color="primary"
                  fullWidth
                  className="mt-auto"
                >
                  Purchase
                </Button>
              </Card.Body>
            </Card>

            <Card>
              <Card.Body className="p-3  gap-0">
                <Card className="bg-base-200 lg:h-[275px] xl:h-[225px] mb-6 text-base-content">
                  <Card.Body className="p-6 gap-0">
                    <div className="flex justify-between">
                      <h3 className="text-xl font-semibold text-primary">
                        5 Credits
                      </h3>
                      <Badge variant="outline" className="font-medium">
                        Best Offer
                      </Badge>
                    </div>

                    <p className="mt-4 flex items-baseline">
                      <span className="text-5xl font-bold tracking-tight text-primary">
                        $20
                      </span>
                    </p>
                    <p className="mt-6 text-sm">
                      Show LiftRight multiple videos of the same exercise or
                      upload different exercises to gain holistic feedback
                      regarding your form.
                    </p>
                  </Card.Body>
                </Card>

                <Button color="primary" fullWidth className="mt-auto">
                  Purchase
                </Button>
              </Card.Body>
            </Card>

            <Card>
              <Card.Body className="p-3  gap-0">
                <Card className="bg-base-200 lg:h-[275px] xl:h-[225px] mb-6">
                  <Card.Body className="p-6 gap-0">
                    <h3 className="text-xl font-semibold">15 Credits</h3>
                    <p className="mt-4 flex items-baseline">
                      <span className="text-5xl font-bold tracking-tight">
                        $50
                      </span>
                    </p>
                    <p className="mt-6 text-sm">
                      Enjoy the ultimate level of choice in understanding the
                      AI's insights into all your weightlifting exercises. Use
                      for yourself or share with friends.
                    </p>
                  </Card.Body>
                </Card>

                <Button
                  variant="outline"
                  color="primary"
                  fullWidth
                  className="mt-auto"
                >
                  Purchase
                </Button>
              </Card.Body>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
};
