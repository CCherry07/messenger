interface UserBoxProps {
  item: any;
}
const UserBox = ({ item }: UserBoxProps) => {
  return <div>{item.name}</div>;
};

export default UserBox;
