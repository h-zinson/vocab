import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Settings2, Sparkles, Zap } from "lucide-react";
import { CardDecorator } from "./card-dec";

export default function Features() {
  return (
    <section className="py-16 md:py-32">
      <div className="@container mx-auto max-w-6xl px-6">
        <div className="text-center">
          <h2 className="text-balance text-4xl font-semibold tracking-tight lg:text-5xl">
            Built to cover your needs
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-balance text-lg text-muted-foreground">
            Learn smarter, faster, and more effectively with features crafted
            for modern language learners.
          </p>
        </div>
        <div className="@min-4xl:grid-cols-3 mx-auto mt-12 grid gap-8 md:mt-20 lg:gap-12">
          <Card className="group relative border-0 bg-transparent shadow-none transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="pb-6">
              <CardDecorator>
                <Zap className="size-6" aria-hidden />
              </CardDecorator>

              <h3 className="mt-8 text-xl font-medium">Customizable</h3>
            </CardHeader>

            <CardContent>
              <p className="text-pretty text-muted-foreground">
                Choose your learning goals, focus areas, and pace. VocabMaster
                AI adapts to how you learn best, offering full control over your
                vocabulary journey. Our intelligent system personalizes your
                experience, ensuring every learning session is tailored to your
                unique needs and preferences.
              </p>
            </CardContent>
          </Card>

          <Card className="group relative border-0 bg-transparent shadow-none transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="pb-6">
              <CardDecorator>
                <Settings2 className="size-6" aria-hidden />
              </CardDecorator>

              <h3 className="mt-8 text-xl font-medium">
                You have full control
              </h3>
            </CardHeader>

            <CardContent>
              <p className="text-pretty text-muted-foreground">
                Track your growth with gamified stats, daily goals, and review
                cycles. You decide how you want to learn and measure success.
                Our comprehensive analytics dashboard provides detailed insights
                into your progress, helping you stay motivated and achieve your
                language learning objectives effectively.
              </p>
            </CardContent>
          </Card>

          <Card className="group relative border-0 bg-transparent shadow-none transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="pb-6">
              <CardDecorator>
                <Sparkles className="size-6" aria-hidden />
              </CardDecorator>

              <h3 className="mt-8 text-xl font-medium">Powered By AI</h3>
            </CardHeader>

            <CardContent>
              <p className="text-pretty text-muted-foreground">
                Our AI recommends new words, creates example sentences, and
                adjusts difficulty in real-time — so you're always learning at
                the perfect level. The advanced machine learning algorithms
                analyze your learning patterns to provide personalized content
                and optimize your vocabulary acquisition journey.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
