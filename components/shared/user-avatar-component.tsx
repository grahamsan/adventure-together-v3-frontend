import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { getInitials } from "@/utils/get-initials";
import getColorFromName from "@/utils/get-color-from-name";

interface UserAvatarComponentProps {
  fullname: string;
  size?: number;
  className?: string;
  avatar?: string | null;
}

export default function UserAvatarComponent({
  fullname,
  size = 32,
  className = "",
  avatar,
}: UserAvatarComponentProps) {
  const reversedName = fullname?.split(" ").reverse().join(" ");

  return (
    <Avatar
      className={`${className}`}
      style={{
        width: size,
        height: size,
      }}
    >
      {/* @ts-ignore */}
      <AvatarImage src={avatar || ""} alt={fullname} />
      <AvatarFallback
        className="text-white font-bold"
        style={{
          backgroundColor: getColorFromName(fullname),
          fontSize: Math.max(size * 0.4, 10),
        }}
      >
        {getInitials(reversedName)}
      </AvatarFallback>
    </Avatar>
  );
}
