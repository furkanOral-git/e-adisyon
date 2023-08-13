import { useRouter } from 'next/router';

function Room(){

    const router = useRouter();
    const { id } = router.query; // Dinamik yol parçasını al

    return (
        <div>
            {id}
        </div>
    )
}
export default Room