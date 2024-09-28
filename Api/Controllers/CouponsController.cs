using Api.Errors;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    public class CouponsController(
        ICouponService couponService    
    ) : BaseApiController
    {
        [HttpGet("{code}")]
        public async Task<ActionResult<AppCoupon>> ValidateCoupon(string code)
        {
            var coupon = await couponService.GetCouponFromPromoCode(code);

            if (coupon == null) return BadRequest(new ApiResponse(400, "Invalid voucher code"));

            return coupon;
        }
    }
}
