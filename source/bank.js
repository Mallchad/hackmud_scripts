

function(context, args)
{
    var caller = context.caller;
    var l = #fs.scripts.lib();
    var out = null;

    // Target user to bank with
    var safehouse = "antares";
    var balance = #hs.accts.balance();
    out = #ms.accts.xfer_gc_to({ to: safehouse, amount: balance, memo: "self safe deposit" });


	return { passthrough: out, success:true };
}
