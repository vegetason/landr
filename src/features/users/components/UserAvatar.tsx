import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '../../../components/ui/avatar';

export default function UserAvatar({
  user,
  ...props
}: {
  user:  {
    name: string;
    imageUrl:string
} | undefined;
} & React.ComponentProps<typeof Avatar>) {
  const initials = user?.name
    ? user.name
        .split(' ')
        .slice(0, 2)
        .map(n => n[0])
        .join('')
        .toUpperCase()
    : '??';

  return (
    <Avatar {...props}>
      <AvatarImage
        src={user?.imageUrl ?? undefined}
        alt={user?.name ?? 'User'}
      />
      <AvatarFallback className="uppercase">{initials}</AvatarFallback>
    </Avatar>
  );
}
