"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DelayForm } from "@/schemas";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { delaychat } from "@/actions/stream/delay-chat";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FormDelayProps {
  data: number;
}

const FormDelay = ({ data }: FormDelayProps) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { update } = useSession();

  const [isPending, startTransition] = useTransition();

  // Convert the initial data (milliseconds) to seconds
  const initialTimeDelay = data / 1000;

  const [timeDelayValue, setTimeDelayValue] =
    useState<number>(initialTimeDelay); // Controlled state in seconds

  useEffect(() => {
    // Focus input on render
    const inputElement = document.getElementById("time-delay");
    if (inputElement) {
      inputElement.focus();
    }
  }, []);

  const form = useForm<z.infer<typeof DelayForm>>({
    resolver: zodResolver(DelayForm),
    defaultValues: {
      timeDelay: initialTimeDelay, // Set initial value in seconds
    },
  });

  const onSubmit = (values: z.infer<typeof DelayForm>) => {
    if (!values.timeDelay) {
      toast.error("Nhập thời gian bạn muốn thay đổi");
      return;
    }

    // Compare the current value in seconds to the initial value (also in seconds)
    if (values.timeDelay === initialTimeDelay) {
      toast.error("Thời gian mới phải khác thời gian cũ!");
      return;
    }

    const newTimeDelay = values.timeDelay * 1000; // Convert back to milliseconds

    startTransition(() => {
      delaychat({ ...values, timeDelay: newTimeDelay })
        .then((data) => {
          if (data.error) {
            toast.error(data.error);
          }
          if (data.success) {
            update();
            router.refresh();
            toast.success(data.success);
          }
        })
        .catch(() => {
          toast.error("Something went wrong");
        });
    });
  };

  return (
    <div className="mt-2">
      <span className="underline text-xs cursor-pointer">
        {open ? (
          <span onClick={() =>{setOpen(false)}} className="flex items-center">
            Ẩn <ChevronUp className="ml-1 w-4 h-4" />
          </span>
        ) : (
          <span onClick={() =>{setOpen(true)}} className="flex items-center">
            Thay đổi thời gian delay <ChevronDown className="ml-1 w-4 h-4" />
          </span>
        )}
      </span>

      {
        open && (
      <Form {...form}>
        <form className="space-y-2" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="timeDelay"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-blue-500">Time delay</FormLabel>
                  <FormControl>
                    <Input
                      id="time-delay"
                      type="number"
                      disabled={isPending}
                      placeholder="Nhập số giây..."
                      {...field}
                      value={timeDelayValue} // Controlled input value in seconds
                      onChange={(e) => {
                        const valueInSeconds = Number(e.target.value);
                    
                        // Check if the value is less than 1
                        if (valueInSeconds < 1) {
                          toast.error("Giá trị tối thiểu là 1 giây!");
                          return; // Prevent state and form value update
                        }
                    
                        setTimeDelayValue(valueInSeconds); // Update displayed value
                        field.onChange(valueInSeconds); // Update form value in seconds
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          {/* Inform the user about the time delay */}
          {timeDelayValue > 0 && (
            <div className="text-sm ">
              Bạn đã giới hạn thời gian chat trong{" "}
              <span className="text-red-500 font-semibold">
                {timeDelayValue}s
              </span>
              .
            </div>
          )}

          <div>
            <Button
              variant="primary"
              className="text-white"
              type="submit"
              disabled={isPending}
            >
              Save
            </Button>
          </div>
        </form>
      </Form>
        )
      }
    </div>
  );
};

export default FormDelay;
