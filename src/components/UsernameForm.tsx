import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUsernameStore } from "@/store/useUsernameStore";
import { PrimaryButton } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Save } from "lucide-react";

const usernameSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be at most 20 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Only letters, numbers, and underscores allowed"),
});

export type UsernameFormValues = z.infer<typeof usernameSchema>;

export function UsernameForm() {
  const { username, setUsername } = useUsernameStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UsernameFormValues>({
    resolver: zodResolver(usernameSchema),
    defaultValues: {
      username,
    },
  });

  const onSubmit = (data: UsernameFormValues) => {
    setUsername(data.username);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex min-w-40 flex-col gap-2 p-4 border-2 border-text rounded-lg"
    >
      <label htmlFor="username" className="text-xl font-semibold">
        Username
      </label>

      <Input
        id="username"
        placeholder="Enter username"
        className="focus:bg-violet-500/50"
        {...register("username")}
      />

      {errors.username && (
        <label style={{ color: "var(--red-9)", fontSize: 12 }}>
          {errors.username.message}
        </label>
      )}

      <div style={{ display: "flex", gap: "0.5rem" }}>
        <PrimaryButton icon={<Save />} type="submit" disabled={isSubmitting}>
          Save
        </PrimaryButton>
      </div>
    </form>
  );
}
