import { createFileRoute } from "@tanstack/react-router";
import { Wishlist } from "../../components/wishlist/Wishlist";

export const Route = createFileRoute("/draggable-wishlist/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Wishlist />;
}
